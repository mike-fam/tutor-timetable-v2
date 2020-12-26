import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { SessionStream } from "../entities";
import { getConnection } from "typeorm";
import { SessionType } from "../../types/session";
import { IsoDay } from "../../types/date";

@Resolver()
export class SessionStreamResolver {
    @Query(() => [SessionStream])
    async sessionStreams(
        @Arg("termId") termId: number,
        @Arg("courseIds", () => [Int]) courseIds: number[]
    ): Promise<SessionStream[]> {
        const streams =  await getConnection()
            .getRepository(SessionStream)
            .createQueryBuilder("sessionStream")
            .innerJoinAndSelect("sessionStream.timetable", "timetable")
            .where("timetable.termId = :termId", { termId })
            .andWhere("timetable.courseId IN (:...courseIds)", { courseIds }).getMany();
        console.log(streams);
        return streams;
    }

    @Mutation(() => SessionStream)
    async addSessionStream(
        @Arg("timetableId", () => Int) timetableId: number,
        @Arg("name") name: string,
        @Arg("type", () => SessionType) type: SessionType,
        @Arg("day", () => IsoDay) day: IsoDay,
        @Arg("startTime") startTime: number,
        @Arg("endTime") endTime: number,
        @Arg("weeks", () => [Int]) weeks: number[],
        @Arg("location") location: string
    ): Promise<SessionStream> {
        return await SessionStream.create({timetableId, name, type, day, startTime, endTime, weeks, location}).save();
    }
}
