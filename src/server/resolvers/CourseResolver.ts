import { Arg, Query, Resolver } from "type-graphql";
import { Course } from "../entities";

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async courses(): Promise<Course[]> {
        return await Course.find({});
    }

    @Query(() => Course)
    async course(@Arg("courseId") courseId: string): Promise<Course> {
        return await Course.findOneOrFail(courseId);
    }
}
