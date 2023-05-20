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
import { Models } from "../types/models";

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
        models: Models,
        user: User
    ) {
        const timetable = await models.timetable.getBy(
            { termId, courseId },
            user
        );
        const courseStaff = await models.courseStaff.getBy(
            { timetableId: timetable.id, userId: owner.id },
            user
        );
        return await models.preference.getIfExistsBy(
            {
                courseStaffId: courseStaff.id,
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
            models,
            req.user
        );
    }

    @Query(() => Preference)
    async preferenceByUsername(
        @Arg("username") username: string,
        @Arg("courseTermId", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Preference | null> {
        const user = await models.user.getBy({ username }, req.user);
        return await PreferenceResolver.getPreference(
            user,
            courseId,
            termId,
            models,
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
        const user = req.user;
        let preference = await PreferenceResolver.getPreference(
            req.user,
            courseId,
            termId,
            models,
            user
        );
        const timetable = await models.timetable.getBy(
            {
                courseId,
                termId,
            },
            user
        );
        if (!preference) {
            const courseStaff = await models.courseStaff.getBy(
                {
                    timetableId: timetable.id,
                    userId: user.id,
                },
                user
            );
            return await models.preference.create(
                {
                    sessionType,
                    maxContigHours,
                    maxWeeklyHours,
                    courseStaffId: courseStaff.id,
                },
                user
            );
        } else {
            return await models.preference.update(
                { id: preference.id },
                { sessionType, maxContigHours, maxWeeklyHours },
                user
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
