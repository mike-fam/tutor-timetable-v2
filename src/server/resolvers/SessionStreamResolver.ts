import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
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
import { Models } from "../types/models";
import { Request } from "express";
import { CourseTermIdInput } from "./CourseTermId";
import { Column } from "typeorm";
import min from "lodash/min";
import { IsEnum, Max, Min, MinLength } from "class-validator";
import { UniqueWeeks } from "../validators/sessionStream";
import { IsGreaterThan, IsLessThan } from "../validators/number";
import { asyncForEach } from "../../utils/array";

@InputType()
export class MergedStreamTutorNumbers {
    @Field(() => Int)
    @Min(0)
    week: number;

    @Field(() => Int)
    @Min(0)
    numberOfTutors: number;
}

@InputType()
export class MergedStreamInput extends CourseTermIdInput {
    @Field()
    @MinLength(1)
    name: string;

    @Field(() => SessionType)
    type: SessionType;

    @Field(() => Int)
    @IsEnum(IsoDay)
    day: IsoDay;

    @Field()
    @Min(0)
    @Max(24)
    @IsLessThan("endTime")
    startTime: number;

    @Field()
    @Min(0)
    @Max(24)
    @IsGreaterThan("startTime")
    endTime: number;

    @Field()
    @Column("varchar", { length: 15 })
    location: string;

    @Field(() => [MergedStreamTutorNumbers])
    @UniqueWeeks()
    numberOfTutorsForWeeks: MergedStreamTutorNumbers[];
}

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

    @Mutation(() => [SessionStream])
    async addMergedSessionStreams(
        @Arg("sessionStreams", () => [MergedStreamInput])
        streamInputs: MergedStreamInput[],
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream[]> {
        const user = req.user;
        const streamsToBeCreated: Partial<SessionStream>[] = [];
        const rootStreams: SessionStream[] = [];
        for (const streamInput of streamInputs) {
            const {
                courseId,
                termId,
                name,
                type,
                day,
                numberOfTutorsForWeeks,
                startTime,
                endTime,
                location,
            } = streamInput;
            const timetable = await models.timetable.get(
                { courseId, termId },
                user
            );
            // map in { numStaff: week[] } format
            const numberOfStaffWeekMap: Map<number, number[]> = new Map();
            // set of all weeks
            const allWeeks: Set<number> = new Set();
            for (const { week, numberOfTutors } of numberOfTutorsForWeeks) {
                // skip weeks that have 0 staff
                if (numberOfTutors === 0) {
                    continue;
                }
                if (numberOfStaffWeekMap.has(numberOfTutors)) {
                    numberOfStaffWeekMap.get(numberOfTutors)!.push(week);
                } else {
                    numberOfStaffWeekMap.set(numberOfTutors, [week]);
                }
                allWeeks.add(week);
            }
            // If nothing in map, skip. This happens if all weeks have 0 staff
            if (numberOfStaffWeekMap.size === 0) {
                continue;
            }
            // Create root stream
            const minStaffNum = min(Array.from(numberOfStaffWeekMap.keys()))!;
            const rootStream = await models.sessionStream.create(
                {
                    timetableId: timetable.id,
                    name,
                    type,
                    day,
                    startTime,
                    endTime,
                    weeks: Array.from(allWeeks),
                    location,
                    numberOfStaff: minStaffNum,
                },
                user
            );
            rootStreams.push(rootStream);
            numberOfStaffWeekMap.delete(minStaffNum);
            // Create all streams based on root stream
            const extraIndex = 1;
            for (const [numberOfStaff, weeks] of numberOfStaffWeekMap) {
                streamsToBeCreated.push({
                    timetableId: timetable.id,
                    name: `${name} extra ${extraIndex}`,
                    type,
                    day,
                    startTime,
                    weeks,
                    location,
                    numberOfStaff: numberOfStaff - minStaffNum,
                    basedId: rootStream.id,
                });
            }
        }
        const createdStreams = await models.sessionStream.createMany(
            streamsToBeCreated,
            user
        );
        const allStreams = [...rootStreams, ...createdStreams];
        await asyncForEach(
            allStreams,
            async (stream) => await this.generateSessions(stream, req, models)
        );
        return allStreams;
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
        const newStream = await models.sessionStream.create(
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
        await this.generateSessions(newStream, req, models);
        return newStream;
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
        const newStream = await models.sessionStream.create(
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
        await this.generateSessions(newStream, req, models);
        return newStream;
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

    async generateSessions(
        stream: SessionStream,
        req: Request,
        models: Models
    ): Promise<Session[]> {
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
