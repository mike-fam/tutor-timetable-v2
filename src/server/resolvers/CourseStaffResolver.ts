import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CourseStaff, Timetable } from "../entities";
import { Role } from "../../types/user";
import { MyContext } from "../../types/context";

@Resolver()
export class CourseStaffResolver {
    @Mutation(() => CourseStaff)
    async addCourseStaff(
        @Arg("courseId") courseId: number,
        @Arg("termId") termId: number,
        @Arg("role", () => Role) role: Role,
        @Ctx() { req }: MyContext
    ): Promise<CourseStaff> {
        const timetable = await Timetable.findOneOrFail({ courseId, termId });
        const newCourseStaff = await CourseStaff.create({
            role,
            timetable,
            userId: req.user!.id,
        });
        return newCourseStaff.save();
    }

    @Query(() => [CourseStaff])
    async courseStaffs(): Promise<CourseStaff[]> {
        return await CourseStaff.find({});
    }
}
