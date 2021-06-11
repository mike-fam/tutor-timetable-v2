import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { Session, SessionStream, Timetable, User } from "../entities";
import { SessionType } from "../types/session";
import { IsoDay } from "../../types/date";
import { MyContext } from "../types/context";

@Resolver(() => SessionStream)
export class SessionStreamResolver {
    @Query(() => [SessionStream])
    async sessionStreams(
        @Arg("termId") termId: string,
        @Arg("courseIds", () => [String]) courseIds: string[],
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream[]> {
        const timetable = await models.timetable.get(
            {
                where: courseIds.map((courseId) => ({
                    termId,
                    courseId,
                })),
            },
            req.user
        );
        return await models.sessionStream.getMany(
            { timetableId: timetable.id },
            req.user
        );
    }

    @Mutation(() => SessionStream)
    async addBasedSessionStream(
        @Arg("sessionStreamId") sessionStreamId: string,
        @Arg("name") name: string,
        @Arg("weeks", () => [Int]) weeks: number[],
        @Arg("numberOfStaff", () => Int) numberOfStaff: number,
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream> {
        const sessionStream = await models.sessionStream.getById(
            sessionStreamId,
            req.user
        );
        return await models.sessionStream.create(
            {
                name,
                weeks,
                numberOfStaff,
                day: sessionStream.day,
                timetableId: sessionStream.timetableId,
                type: sessionStream.type,
                startTime: sessionStream.startTime,
                endTime: sessionStream.endTime,
                location: sessionStream.location,
                based: sessionStream,
            },
            req.user
        );
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
        @Arg("numberOfStaff", () => Int) numberOfStaff: number,
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream> {
        return await models.sessionStream.create(
            {
                timetableId,
                name,
                type,
                day,
                startTime,
                endTime,
                weeks,
                location,
                numberOfStaff,
            },
            req.user
        );
    }

    @Mutation(() => SessionStream)
    async addStreamStaff(
        @Arg("streamId") streamId: string,
        @Arg("newStaffs", () => [String]) newStaffs: string[],
        @Arg("updateSessions", () => Boolean) updateSessions: boolean,
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream> {
        const stream = await models.sessionStream.getById(streamId, req.user);
        const usersToAllocate = await models.user.getByIds(newStaffs, req.user);
        await models.sessionStream.allocateMultiple(
            stream,
            usersToAllocate,
            req.user
        );
        if (updateSessions) {
            const sessions = await models.session.getByIds(
                stream.sessionIds,
                req.user
            );
            for (const session of sessions) {
                await models.session.allocateMultiple(
                    session,
                    usersToAllocate,
                    req.user
                );
            }
        }
        return stream;
    }

    @Mutation(() => [Session])
    async generateSessions(
        @Arg("sessionStreamId") sessionStreamId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Session[]> {
        const stream = await models.sessionStream.getById(
            sessionStreamId,
            req.user
        );
        const allocatedUsers = await models.user.getByIds(
            stream.allocatedUserIds,
            req.user
        );
        return await models.session.createMany(
            stream.weeks.map((week) => ({
                week,
                location: stream.location,
                sessionStream: stream,
                allocatedUsers,
            })),
            req.user
        );
    }

    @FieldResolver(() => Timetable)
    async timetable(
        @Root() root: SessionStream,
        @Ctx() { req, models }: MyContext
    ): Promise<Timetable> {
        return await models.timetable.getById(root.timetableId, req.user);
    }

    @FieldResolver(() => [Session])
    async sessions(
        @Root() root: SessionStream,
        @Ctx() { req, models }: MyContext
    ): Promise<Session[]> {
        return await models.session.getByIds(root.sessionIds, req.user);
    }

    @FieldResolver(() => [SessionStream])
    async basedStreams(
        @Root() root: SessionStream,
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream[]> {
        return await models.sessionStream.getByIds(
            root.basedStreamIds,
            req.user
        );
    }

    @FieldResolver(() => SessionStream, { nullable: true })
    async based(
        @Root() root: SessionStream,
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream | null> {
        if (!root.basedId) {
            return null;
        }
        return await models.sessionStream.getById(root.basedId, req.user);
    }

    @FieldResolver(() => [User])
    async allocatedUsers(
        @Root() root: SessionStream,
        @Ctx() { req, models }: MyContext
    ): Promise<User[]> {
        return await models.user.getByIds(root.allocatedUserIds, req.user);
    }
}
