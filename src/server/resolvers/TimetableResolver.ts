import { Arg, Query, Resolver } from "type-graphql";
import { Timetable } from "../entities";

@Resolver()
export class TimetableResolver {
    @Query(() => [Timetable])
    async timetables(): Promise<Timetable[]> {
        return await Timetable.find({});
    }

    @Query(() => Timetable, { nullable: true })
    async timetable(
        @Arg("courseId") courseId: string,
        @Arg("termId") termId: string
    ): Promise<Timetable | undefined> {
        return await Timetable.findOne({ courseId, termId });
    }

    @Query(() => Timetable, { nullable: true })
    async timetableById(@Arg("id") id: string): Promise<Timetable | undefined> {
        return await Timetable.findOne({ id });
    }
}
