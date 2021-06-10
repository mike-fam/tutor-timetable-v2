import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { CourseStaff, Preference, User } from "../entities";
import { MyContext } from "../types/context";
import { SessionType } from "../types/session";
import { CourseTermIdInput } from "./CourseTermId";
import { PreferenceModel } from "../models/PreferenceModel";

@InputType()
class PreferenceInput {
    @Field(() => SessionType, { nullable: true })
    sessionType: SessionType;

    @Field()
    maxContigHours: number;

    @Field()
    maxWeeklyHours: number;
}

@Resolver(() => Preference)
export class PreferenceResolver {
    static async getPreference(
        owner: User,
        courseId: string,
        termId: string,
        model: PreferenceModel,
        user: User
    ) {
        return await model.getIfExists(
            {
                courseStaff: {
                    timetable: {
                        termId,
                        courseId,
                    },
                    userId: owner.id,
                },
            },
            user
        );
    }

    @Query(() => Preference, { nullable: true })
    async myPreference(
        @Arg("preferenceFindInput", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Preference | null> {
        return await PreferenceResolver.getPreference(
            req.user,
            courseId,
            termId,
            models.preference,
            req.user
        );
    }

    // TODO: Only course coordinators can do this
    @Query(() => Preference)
    async preferenceByUsername(
        @Arg("username") username: string,
        @Arg("courseTermId", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Preference | null> {
        const user = await models.user.get({ username }, req.user);
        return await PreferenceResolver.getPreference(
            user,
            courseId,
            termId,
            models.preference,
            req.user
        );
    }

    @Mutation(() => Preference)
    async updatePreference(
        @Arg("preferenceFind", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput,
        @Arg("preference", () => PreferenceInput)
        { sessionType, maxContigHours, maxWeeklyHours }: PreferenceInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Preference> {
        let preference = await PreferenceResolver.getPreference(
            req.user,
            courseId,
            termId,
            models.preference,
            req.user
        );
        if (!preference) {
            const courseStaff = await models.courseStaff.get(
                {
                    timetable: {
                        courseId,
                        termId,
                    },
                    user: req.user,
                },
                req.user
            );
            return await models.preference.create(
                {
                    sessionType,
                    maxContigHours,
                    maxWeeklyHours,
                    courseStaff,
                },
                req.user
            );
        } else {
            return await models.preference.update(
                preference,
                { sessionType, maxContigHours, maxWeeklyHours },
                req.user
            );
        }
    }

    @FieldResolver(() => CourseStaff)
    async courseStaff(
        @Root() root: Preference,
        @Ctx() { req, models }: MyContext
    ): Promise<CourseStaff> {
        return models.courseStaff.getById(root.courseStaffId, req.user);
    }
}
