import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Course } from "../entities";
import { CourseModel } from "../models/CourseModel";
import { MyContext } from "../types/context";

@Resolver()
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
}
