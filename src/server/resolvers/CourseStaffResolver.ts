import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { CourseStaff, Timetable, User } from "../entities";
import { Role } from "../types/user";
import { CourseTermIdInput } from "./CourseTermId";
import { getConnection } from "typeorm";
import { redacted } from "../constants";

@InputType()
export class CourseStaffInput extends CourseTermIdInput {
    @Field(() => Role)
    role: Role;

    @Field(() => Boolean)
    isNew: boolean;

    @Field()
    username: string;
}

@Resolver()
export class CourseStaffResolver {
    @Mutation(() => CourseStaff)
    async addCourseStaff(
        @Arg("courseStaffInput")
        { courseId, termId, role, isNew, username }: CourseStaffInput
    ): Promise<CourseStaff> {
        const timetable = await Timetable.findOneOrFail({ courseId, termId });
        let user = await User.findOne({ username });
        if (!user) {
            user = await User.create({
                username,
                name: redacted,
                email: redacted,
            }).save();
        }
        const newCourseStaff = CourseStaff.create({
            role,
            isNew,
            timetable,
        });
        newCourseStaff.user = Promise.resolve(user);
        return await newCourseStaff.save();
    }

    @Query(() => [CourseStaff])
    async courseStaffs(
        @Arg("courseTermInput", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput
    ): Promise<CourseStaff[]> {
        return await getConnection()
            .getRepository(CourseStaff)
            .createQueryBuilder("courseStaff")
            .innerJoinAndSelect("courseStaff.timetable", "timetable")
            .where("timetable.courseId = :courseId", { courseId })
            .andWhere("timetable.termId = :termId", { termId })
            .getMany();
    }
}
