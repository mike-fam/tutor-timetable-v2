import { Arg, Int, Query, Resolver } from "type-graphql";
import { Course } from "../entities";

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async courses(): Promise<Course[]> {
        return await Course.find({});
    }

    @Query(() => Course)
    async course(
        @Arg("courseId", () => Int) courseId: number
    ): Promise<Course> {
        return await Course.findOneOrFail(courseId);
    }
}
