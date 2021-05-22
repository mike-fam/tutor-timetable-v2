import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import {
    Session,
    SessionAllocation,
    SessionStream,
    StreamAllocation,
} from "../entities";
import { getConnection } from "typeorm";
import { SessionType } from "../types/session";
import { IsoDay } from "../../types/date";

@Resolver()
export class SessionStreamResolver {
    @Query(() => [SessionStream])
    async sessionStreams(
        @Arg("termId") termId: string,
        @Arg("courseIds", () => [Int]) courseIds: string[]
    ): Promise<SessionStream[]> {
        if (courseIds.length === 0) {
            return [];
        }
        return await getConnection()
            .getRepository(SessionStream)
            .createQueryBuilder("sessionStream")
            .innerJoinAndSelect("sessionStream.timetable", "timetable")
            .where("timetable.termId = :termId", { termId })
            .andWhere("timetable.courseId IN (:...courseIds)", { courseIds })
            .getMany();
    }

    @Mutation(() => SessionStream)
    async addBasedSessionStream(
        @Arg("sessionStreamId") sessionStreamId: number,
        @Arg("name") name: string,
        @Arg("weeks", () => [Int]) weeks: number[],
        @Arg("numberOfStaff", () => Int) numberOfStaff: number
    ): Promise<SessionStream> {
        const sessionStream = await SessionStream.findOneOrFail(
            sessionStreamId
        );
        return await SessionStream.create({
            name,
            weeks,
            numberOfStaff,
            day: sessionStream.day,
            timetableId: sessionStream.timetableId,
            type: sessionStream.type,
            startTime: sessionStream.startTime,
            endTime: sessionStream.endTime,
            location: sessionStream.location,
        }).save();
    }

    @Mutation(() => SessionStream)
    async addSessionStream(
        @Arg("timetableId") timetableId: string,
        @Arg("name") name: string,
        @Arg("type", () => SessionType) type: SessionType,
        @Arg("day", () => Int) day: IsoDay,
        @Arg("startTime") startTime: number,
        @Arg("endTime") endTime: number,
        @Arg("weeks", () => [Int]) weeks: number[],
        @Arg("location") location: string,
        @Arg("numberOfStaff", () => Int) numberOfStaff: number
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
            numberOfStaff,
        }).save();
    }

    @Mutation(() => SessionStream)
    async addStreamStaff(
        @Arg("streamId") streamId: string,
        @Arg("newStaffs", () => [String]) newStaffs: string[],
        @Arg("updateSessions", () => Boolean) updateSessions: boolean
    ): Promise<SessionStream> {
        const stream = await SessionStream.findOneOrFail({ id: streamId });
        const allocations = [...(await stream.streamAllocations)];
        const newAllocations = [];
        for (const userId of newStaffs) {
            if (
                allocations.some((allocation) => allocation.userId === userId)
            ) {
                continue;
            }
            newAllocations.push(
                StreamAllocation.create({ userId, sessionStreamId: streamId })
            );
        }
        await StreamAllocation.save(newAllocations);
        if (updateSessions) {
            const sessions = await stream.sessions;
            const newSessionAllocations = [];
            for (const session of sessions) {
                const sessionAllocations = await session.sessionAllocations;
                for (const userId of newStaffs) {
                    if (
                        sessionAllocations.some(
                            (allocation) => allocation.userId === userId
                        )
                    ) {
                        continue;
                    }
                    newSessionAllocations.push(
                        SessionAllocation.create({
                            userId,
                            sessionId: session.id,
                        })
                    );
                }
            }
            await SessionAllocation.save(newSessionAllocations);
        }
        return stream;
    }

    @Mutation(() => [Session])
    async generateSessions(
        @Arg("sessionStreamId") sessionStreamId: string
    ): Promise<Session[]> {
        const stream = await SessionStream.findOneOrFail({
            id: sessionStreamId,
        });
        const allocations = await stream.streamAllocations;
        const sessions = Session.create(
            stream.weeks.map((week) => ({
                week,
                location: stream.location,
                sessionStream: stream,
                sessionAllocations: Promise.resolve(
                    SessionAllocation.create(
                        allocations.map((allocation) => ({
                            user: allocation.user,
                        }))
                    )
                ),
            }))
        );
        return await Session.save(sessions);
    }
}
