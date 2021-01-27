import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { CourseStaff, Timetable } from "../entities";
import { Role } from "../../types/user";
import { MyContext } from "../../types/context";
import { CourseTermIdInput } from "./CourseTermId";
import { getConnection } from "typeorm";

@InputType()
export class CourseStaffInput extends CourseTermIdInput {
    @Field(() => Role)
    role: Role;

    @Field(() => Boolean)
    isNew: boolean;
}

@Resolver()
export class CourseStaffResolver {
    @Mutation(() => CourseStaff)
    async addCourseStaff(
        @Arg("courseStaffInput")
        { courseId, termId, role, isNew }: CourseStaffInput,
        @Ctx() { req }: MyContext
    ): Promise<CourseStaff> {
        const timetable = await Timetable.findOneOrFail({ courseId, termId });
        const newCourseStaff = await CourseStaff.create({
            role,
            isNew,
            timetable,
            userId: req.user!.id,
        });
        return newCourseStaff.save();
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
