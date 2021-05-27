import { Query, Resolver } from "type-graphql";
import { Course, Timetable } from "../entities";
import { CheckPermEntity } from "../auth/decorators";
import { Permission } from "../types/permission";

@Resolver()
export class HelloResolver {
    @Query(() => String)
    async hello(): Promise<string> {
        return "Hello world";
    }

    @CheckPermEntity(Permission.READ)
    @Query(() => Course)
    async test(): Promise<Course> {
        const timetable = await Timetable.findOneOrFail();
        return await timetable.getCourse();
    }
}
