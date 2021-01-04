import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import {
    Session,
    SessionAllocation,
    SessionStream,
    StreamAllocation,
} from "../entities";
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
        const streams = await getConnection()
            .getRepository(SessionStream)
            .createQueryBuilder("sessionStream")
            .innerJoinAndSelect("sessionStream.timetable", "timetable")
            .where("timetable.termId = :termId", { termId })
            .andWhere("timetable.courseId IN (:...courseIds)", { courseIds })
            .getMany();
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
        return await SessionStream.create({
            timetableId,
            name,
            type,
            day,
            startTime,
            endTime,
            weeks,
            location,
        }).save();
    }

    @Mutation(() => SessionStream)
    async addStreamStaff(
        @Arg("streamId") streamId: number,
        @Arg("newStaffs", () => [String]) newStaffs: string[]
    ): Promise<SessionStream> {
        const stream = await SessionStream.findOneOrFail({ id: streamId });
        const allocations = [...(await stream.streamAllocations)];
        for (const username of newStaffs) {
            if (
                allocations.some(
                    (allocation) => allocation.userUsername === username
                )
            ) {
                continue;
            }
            allocations.push(
                StreamAllocation.create({ userUsername: username })
            );
        }
        stream.streamAllocations = Promise.resolve(allocations);
        await stream.save();
        return stream;
    }

    @Mutation(() => Boolean)
    async generateSessions(
        @Arg("sessionStreamId") sessionStreamId: number
    ): Promise<boolean> {
        const stream = await SessionStream.findOne({
            id: sessionStreamId,
        });
        if (!stream) {
            return false;
        }
        console.log(stream);
        const allocations = await stream.streamAllocations;
        const sessions = Session.create(
            stream.weeks.map((week) => ({
                week,
                location: stream.location,
                sessionStream: stream,
                sessionAllocations: SessionAllocation.create(
                    allocations.map((allocation) => ({
                        user: allocation.user,
                    }))
                ),
            }))
        );
        console.log(sessions);
        return true;
        // const sessions = await getConnection()
        //     .getRepository(Session)
        //     .createQueryBuilder()
        //     .insert()
        //     .values(
        //         stream.weeks.map((week) => {
        //             return {
        //                 week,
        //                 location: stream.location,
        //                 sessionStream: stream,
        //             };
        //         })
        //     )
        //     .returning("*")
        //     .execute();
    }
}
