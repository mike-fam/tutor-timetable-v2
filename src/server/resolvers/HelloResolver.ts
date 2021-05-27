import { Query, Resolver } from "type-graphql";
import { Timetable } from "../entities";
import { CheckPermEntity } from "../auth/decorators";
import { Permission } from "../types/permission";

@Resolver()
export class HelloResolver {
    @Query(() => String)
    async hello(): Promise<string> {
        return "Hello world";
    }

    @CheckPermEntity(Permission.READ)
    @Query(() => Timetable)
    async test(): Promise<Timetable> {
        const timetable = await Timetable.findOneOrFail();
        return timetable;
    }
}
