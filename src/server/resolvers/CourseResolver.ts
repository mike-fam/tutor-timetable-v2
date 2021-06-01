import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Course, Timetable } from "../entities";
import { CourseModel } from "../models/CourseModel";
import { MyContext } from "../types/context";

@Resolver(() => Course)
export class CourseResolver {
    @Query(() => [Course])
    async courses(@Ctx() { req }: MyContext): Promise<Course[]> {
        return CourseModel.getMany({}, req.user);
    }

    @Query(() => Course)
    async course(
        @Arg("courseId") courseId: string,
        @Ctx() { req }: MyContext
    ): Promise<Course> {
        return await CourseModel.getById(courseId, req.user);
    }

    @FieldResolver(() => [Timetable])
    async timetables(@Root() course: Course): Promise<Timetable[]> {
        return (await Course.loaders.timetable.loadMany(
            course.timetableIds
        )) as Timetable[];
    }
}
