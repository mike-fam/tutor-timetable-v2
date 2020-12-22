import { Query, Resolver } from "type-graphql";
import { Course } from "../entities";

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async courses(): Promise<Course[]> {
        return await Course.find({});
    }
}
