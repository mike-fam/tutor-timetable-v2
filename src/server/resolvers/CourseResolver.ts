import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Course, Timetable } from "../entities";
import { MyContext } from "../types/context";

@Resolver(() => Course)
export class CourseResolver {
    @Query(() => [Course])
    async courses(@Ctx() { req, models }: MyContext): Promise<Course[]> {
        return models.course.getMany({}, req.user);
    }

    @Query(() => Course)
    async course(
        @Arg("courseId") courseId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Course> {
        return await models.course.getById(courseId, req.user);
    }

    @FieldResolver(() => [Timetable])
    async timetables(
        @Root() course: Course,
        @Ctx() { req, models }: MyContext
    ): Promise<Timetable[]> {
        return await models.timetable.getByIds(course.timetableIds, req.user);
    }
}
