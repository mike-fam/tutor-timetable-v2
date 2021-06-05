import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Course, Timetable } from "../entities";
import { MyContext } from "../types/context";
import { EntityResolver } from "./EntityResolver";

@Resolver(() => Course)
export class CourseResolver extends EntityResolver {
    @Query(() => [Course])
    async courses(@Ctx() { req }: MyContext): Promise<Course[]> {
        return this.courseModel.getMany({}, req.user);
    }

    @Query(() => Course)
    async course(
        @Arg("courseId") courseId: string,
        @Ctx() { req }: MyContext
    ): Promise<Course> {
        return await this.courseModel.getById(courseId, req.user);
    }

    @FieldResolver(() => [Timetable])
    async timetables(
        @Root() course: Course,
        @Ctx() { req }: MyContext
    ): Promise<Timetable[]> {
        return await this.timetableModel.getByIds(
            course.timetableIds,
            req.user
        );
    }
}
