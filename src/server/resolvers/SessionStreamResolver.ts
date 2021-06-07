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
import { getConnection } from "typeorm";
import { SessionType } from "../types/session";
import { IsoDay } from "../../types/date";
import { MyContext } from "../types/context";
import { EntityResolver } from "./EntityResolver";
import { Service } from "typedi";

@Service()
@Resolver(() => SessionStream)
export class SessionStreamResolver extends EntityResolver {
    @Query(() => [SessionStream])
    async sessionStreams(
        @Arg("termId") termId: string,
        @Arg("courseIds", () => [String]) courseIds: string[]
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
        @Arg("updateSessions", () => Boolean) updateSessions: boolean,
        @Ctx() { req }: MyContext
    ): Promise<SessionStream> {
        const stream = await this.streamModel.getById(streamId, req.user);
        const usersToAllocate = await this.userModel.getByIds(
            newStaffs,
            req.user
        );
        await this.streamModel.allocateMultiple(
            stream,
            usersToAllocate,
            req.user
        );
        if (updateSessions) {
            const sessions = await this.sessionModel.getByIds(
                stream.sessionIds,
                req.user
            );
            for (const session of sessions) {
                await this.sessionModel.allocateMultiple(
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
        @Ctx() { req }: MyContext
    ): Promise<Session[]> {
        const stream = await this.streamModel.getById(
            sessionStreamId,
            req.user
        );
        const allocatedUsers = await this.userModel.getByIds(
            stream.allocatedUserIds,
            req.user
        );
        return await this.sessionModel.createMany(
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
        @Ctx() { req }: MyContext
    ): Promise<Timetable> {
        return this.timetableModel.getById(root.timetableId, req.user);
    }

    @FieldResolver(() => [Session])
    async sessions(
        @Root() root: SessionStream,
        @Ctx() { req }: MyContext
    ): Promise<Session[]> {
        return this.sessionModel.getByIds(root.sessionIds, req.user);
    }

    @FieldResolver(() => [SessionStream])
    async basedStreams(
        @Root() root: SessionStream,
        @Ctx() { req }: MyContext
    ): Promise<SessionStream[]> {
        return this.streamModel.getByIds(root.basedStreamIds, req.user);
    }

    @FieldResolver(() => SessionStream, { nullable: true })
    async based(
        @Root() root: SessionStream,
        @Ctx() { req }: MyContext
    ): Promise<SessionStream | null> {
        if (!root.basedId) {
            return null;
        }
        return this.streamModel.getById(root.basedId, req.user);
    }

    @FieldResolver(() => [User])
    async allocatedUsers(
        @Root() root: SessionStream,
        @Ctx() { req }: MyContext
    ): Promise<User[]> {
        return this.userModel.getByIds(root.allocatedUserIds, req.user);
    }
}
