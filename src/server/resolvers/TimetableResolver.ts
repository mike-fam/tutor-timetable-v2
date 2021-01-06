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
        @Arg("courseId") courseId: number,
        @Arg("termId") termId: number
    ): Promise<Timetable | undefined> {
        return await Timetable.findOne({ courseId, termId });
    }

    @Query(() => Timetable, { nullable: true })
    async timetableById(@Arg("id") id: number): Promise<Timetable | undefined> {
        return await Timetable.findOne({ id });
    }
}
