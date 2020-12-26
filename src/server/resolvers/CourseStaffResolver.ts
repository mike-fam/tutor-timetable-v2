import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CourseStaff, Timetable } from "../entities";
import { Role } from "../../types/user";

@Resolver()
export class CourseStaffResolver {
    @Mutation(() => CourseStaff)
    async addCourseStaff(
        @Arg("courseId") courseId: number,
        @Arg("username") username: string,
        @Arg("termId") termId: number,
        @Arg("role", () => Role) role: Role,
    ): Promise<CourseStaff> {
        const timetable = await Timetable.findOneOrFail({ courseId, termId });
        const newCourseStaff = await CourseStaff.create({
            role,
            timetable,
            userUsername: username,
        });
        return newCourseStaff.save();
    }

    @Query(() => [CourseStaff])
    async courseStaffs(): Promise<CourseStaff[]> {
        return await CourseStaff.find({});
    }
}
