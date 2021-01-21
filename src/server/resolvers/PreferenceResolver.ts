import {
    Arg,
    Ctx,
    Field,
    InputType,
    Int,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { CourseStaff, Preference, User } from "../entities";
import { MyContext } from "../../types/context";
import { getConnection } from "typeorm";
import { SessionType } from "../../types/session";

@InputType()
class PreferenceFindInput {
    @Field(() => Int)
    courseId: number;

    @Field(() => Int)
    termId: number;
}

@InputType()
class PreferenceInput {
    @Field(() => SessionType, { nullable: true })
    sessionType: SessionType;

    @Field()
    maxContigHours: number;

    @Field()
    maxWeeklyHours: number;
}

@Resolver()
export class PreferenceResolver {
    static async getPreference(user: User, courseId: number, termId: number) {
        return await getConnection()
            .getRepository(Preference)
            .createQueryBuilder("preference")
            .innerJoinAndSelect("preference.courseStaff", "courseStaff")
            .innerJoinAndSelect("courseStaff.timetable", "timetable")
            .where("timetable.courseId = :courseId", { courseId })
            .andWhere("timetable.termId = :termId", { termId })
            .andWhere("courseStaff.userId = :userId", {
                userId: user.id,
            })
            .getOne();
    }

    @Query(() => Preference, { nullable: true })
    async myPreference(
        @Arg("preferenceFindInput", () => PreferenceFindInput)
        { courseId, termId }: PreferenceFindInput,
        @Ctx() { req }: MyContext
    ): Promise<Preference | undefined> {
        return await PreferenceResolver.getPreference(
            req.user!,
            courseId,
            termId
        );
    }

    @Mutation(() => Preference)
    async updatePreference(
        @Arg("preferenceFind", () => PreferenceFindInput)
        { courseId, termId }: PreferenceFindInput,
        @Arg("preference", () => PreferenceInput)
        { sessionType, maxContigHours, maxWeeklyHours }: PreferenceInput,
        @Ctx() { req }: MyContext
    ): Promise<Preference> {
        let preference = await PreferenceResolver.getPreference(
            req.user!,
            courseId,
            termId
        );
        const courseStaff = await getConnection()
            .getRepository(CourseStaff)
            .createQueryBuilder("courseStaff")
            .innerJoinAndSelect("courseStaff.timetable", "timetable")
            .where("timetable.courseId = :courseId", { courseId })
            .andWhere("timetable.termId = :termId", { termId })
            .andWhere("courseStaff.userId = :userId", {
                userId: req.user!.id,
            })
            .getOne();
        if (!preference) {
            preference = Preference.create({
                sessionType,
                maxContigHours,
                maxWeeklyHours,
                courseStaff,
            });
        } else {
            preference.sessionType = sessionType;
            preference.maxWeeklyHours = maxWeeklyHours;
            preference.maxContigHours = maxContigHours;
        }
        return Preference.save(preference);
    }
}
