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
import { In, IsNull } from "typeorm";
import isEqual from "lodash/isEqual";
import min from "lodash/min";
import uniqBy from "lodash/uniqBy";
import { IsEnum, IsOptional, Max, Min, MinLength } from "class-validator";
import { UniqueWeeks } from "../validators/sessionStream";
import { IsGreaterThan, IsLessThan } from "../validators/number";
import { asyncForEach, getAllIndices } from "../../utils/array";
import { PERM_ERR } from "../constants";
import { getPublicTimetableData } from "../utils/publicTimetable";
import parse from "date-fns/parse";
import startOfISOWeek from "date-fns/startOfISOWeek";
import differenceInWeeks from "date-fns/differenceInWeeks";
import { dayToIsoNumber, timeStringToHours } from "../../utils/date";
import { v4 as uuid } from "uuid";
import sortBy from "lodash/sortBy";
import differenceBy from "lodash/differenceBy";
import { isOptional } from "@typescript-eslint/typescript-estree/dist/node-utils";
import keyBy from "lodash/keyBy";
import mapValues from "lodash/mapValues";
import { DataLoaders } from "../types/dataloaders";

@InputType()
export class StreamAllocationPattern {
    @Field(() => [Int])
    weeks: number[];

    @Field(() => [String])
    allocation: string[];
}

@InputType()
export class ChangeStreamAllocationInput {
    @Field()
    streamId: string;

    @Field(() => [StreamAllocationPattern])
    allocation: StreamAllocationPattern[];
}

@InputType()
export class StreamTutorNumbersPattern {
    @Field(() => Int)
    @Min(0)
    week: number;

    @Field(() => Int)
    @Min(0)
    numberOfTutors: number;
}

@InputType("StreamInput")
export class StreamInput {
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
    location: string;

    @Field(() => [StreamTutorNumbersPattern])
    @UniqueWeeks()
    numberOfTutorsForWeeks: StreamTutorNumbersPattern[];
}

@InputType()
export class MergedStreamInput extends StreamInput {
    @Field()
    courseId: string;

    @Field()
    termId: string;
}

@InputType()
export class UpdateStreamInput extends StreamInput {
    @Field()
    streamId: string;
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

    /**
     * Add new merged session streams in a front-end friendly structure
     *
     * @param {MergedStreamInput[]} streamInputs session stream inputs with
     *      merged allocation information
     * @param {MyContext} context context passed from apollo server
     * @returns {Promise<SessionStream[]>} session streams created
     */
    @Mutation(() => [SessionStream])
    async addMergedSessionStreams(
        @Arg("sessionStreams", () => [MergedStreamInput])
        streamInputs: MergedStreamInput[],
        @Ctx() { req, models, loaders }: MyContext
    ): Promise<SessionStream[]> {
        const user = req.user;
        const rootStreams: SessionStream[] = [];
        await asyncForEach(
            streamInputs,
            async ({ courseId, termId, ...streamInput }) => {
                const timetable = await models.timetable.get(
                    { courseId, termId },
                    user
                );
                const rootStream = await this.createStreamFromInput(
                    streamInput,
                    timetable,
                    models,
                    user,
                    loaders
                );
                if (rootStream) {
                    rootStreams.push(rootStream);
                }
            }
        );
        return rootStreams;
    }

    @Query(() => [SessionStream])
    async rootSessionStreams(
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
            {
                where: {
                    timetableId: timetable.id,
                    rootId: IsNull(),
                },
            },
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
                root: sessionStream,
            },
            req.user
        );
        await this.generateSessions(newStream, req.user, models);
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
        await this.generateSessions(newStream, req.user, models);
        return newStream;
    }

    @Mutation(() => [String])
    async deleteSessionStreams(
        @Arg("streamIds", () => [String]) streamIds: string[],
        @Ctx() { req, models }: MyContext
    ): Promise<string[]> {
        await models.sessionStream.deleteMany(
            {
                id: In(streamIds),
            },
            req.user
        );
        return streamIds;
    }

    @Mutation(() => [SessionStream])
    async updateSessionStreams(
        @Arg("updateStreamInput", () => [UpdateStreamInput])
        streamInputs: UpdateStreamInput[],
        @Ctx() { req, models, loaders }: MyContext
    ): Promise<SessionStream[]> {
        const { user } = req;
        const { sessionStream: streamModel } = models;
        const updatedStreams: SessionStream[] = [];
        await asyncForEach(streamInputs, async ({ streamId, ...input }) => {
            // Get allocation pattern, compare with existing pattern
            const existingStream = await streamModel.getById(streamId, user);
            const secondaryStreams = await streamModel.getByIds(
                existingStream.secondaryStreamIds,
                user
            );
            const existingPattern = mapValues(
                keyBy(existingStream.weeks),
                () => existingStream.numberOfStaff
            );
            for (const secondaryStream of secondaryStreams) {
                for (const week of secondaryStream.weeks) {
                    existingPattern[week] += secondaryStream.numberOfStaff;
                }
            }
            const updatedPattern = mapValues(
                keyBy(input.numberOfTutorsForWeeks, (pattern) => pattern.week),
                (value) => value.numberOfTutors
            );

            // If not equal, delete all streams and recreate from scratch
            if (!isEqual(existingPattern, updatedPattern)) {
                const timetable = await models.timetable.getById(
                    existingStream.timetableId,
                    user
                );
                await streamModel.delete({ id: streamId }, user);
                const createdStream = await this.createStreamFromInput(
                    input,
                    timetable,
                    models,
                    user,
                    loaders,
                    existingStream.id
                );
                if (createdStream) {
                    updatedStreams.push(createdStream);
                }
            } else {
                // Otherwise, update as normal
                const { name, type, day, startTime, endTime, location } = input;
                const updatedStream = await streamModel.update(
                    existingStream,
                    { name, type, day, startTime, endTime, location },
                    user
                );
                updatedStreams.push(updatedStream);
            }
        });
        return updatedStreams;
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

    @Query(() => [SessionStream])
    async fromPublicTimetable(
        @Arg("courseTerm", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput,
        @Arg("sessionTypes", () => [SessionType])
        sessionTypes: SessionType[],
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream[]> {
        const user = req.user;
        const course = await models.course.getById(courseId, user);
        const term = await models.term.getById(termId, user);
        if (!user.isAdmin && !(await user.isCoordinatorOf(course, term))) {
            throw new Error(PERM_ERR);
        }
        const generatedStreams = [];
        const timetable = await models.timetable.get(
            { courseId, termId },
            user
        );
        const courseData = await getPublicTimetableData(
            term,
            course,
            sessionTypes
        );
        for (const courseOffering of Object.values(courseData)) {
            const subjectCode = courseOffering.subject_code;
            const teachingMode = subjectCode.split("_").slice(-1)[0];
            let mode = "";
            if (teachingMode === "FD") {
                mode = "Flexible";
            } else if (teachingMode === "EX") {
                mode = "External";
            } else if (teachingMode === "IN") {
                mode = "Internal";
            }
            for (const activity of Object.values(courseOffering.activities)) {
                const startDate = startOfISOWeek(
                    parse(activity.start_date, "dd/MM/yyyy", new Date())
                );
                const weekOffset = differenceInWeeks(term.startDate, startDate);
                const weeks = getAllIndices(activity.week_pattern, "1");
                const relativeWeeks = weeks.map((week) => week - weekOffset);
                const startTime = timeStringToHours(activity.start_time);
                const locations = Object.keys(activity.assigned_locations);
                const newStream = SessionStream.create({
                    id: uuid(),
                    name: `${activity.activity_type.charAt(0)}${
                        activity.activity_code
                    } ${mode}`,
                    type: activity.activity_type as SessionType,
                    day: dayToIsoNumber(activity.day_of_week),
                    startTime,
                    endTime: startTime + parseInt(activity.duration) / 60,
                    weeks: relativeWeeks,
                    location: locations.length > 0 ? locations[0] : "",
                    numberOfStaff: 0,
                    rootId: undefined,
                    timetableId: timetable.id,
                });
                generatedStreams.push(newStream);
            }
        }
        return generatedStreams;
    }

    @Mutation(() => [SessionStream])
    async updateStreamAllocations(
        @Ctx() { req, models }: MyContext,
        @Arg("changeAllocationInput", () => [ChangeStreamAllocationInput])
        allocationInput: ChangeStreamAllocationInput[]
    ): Promise<SessionStream[]> {
        const user = req.user;
        const { sessionStream: streamModel } = models;
        const affectedStreamIds: string[] = [];
        await asyncForEach(allocationInput, async (streamInput) => {
            const rootStream = await streamModel.getById(
                streamInput.streamId,
                user
            );
            const secondaryStreams = await streamModel.getByIds(
                rootStream.secondaryStreamIds,
                user
            );
            const streams = [rootStream, ...secondaryStreams];
            await asyncForEach(
                streamInput.allocation,
                async (allocationPattern) => {
                    const relevantStream = streams.find((stream) =>
                        isEqual(
                            sortBy(stream.weeks),
                            sortBy(allocationPattern.weeks)
                        )
                    );
                    if (!relevantStream) {
                        throw new Error(
                            `Invalid week pattern: no session streams run in weeks ${allocationPattern.weeks.join(
                                ", "
                            )}`
                        );
                    }
                    affectedStreamIds.push(relevantStream.id);
                    const existingUsers = await models.user.getByIds(
                        relevantStream.allocatedUserIds,
                        user
                    );
                    const newUsers = await models.user.getByIds(
                        allocationPattern.allocation,
                        user
                    );
                    const removedUsers = differenceBy(
                        existingUsers,
                        newUsers,
                        (user) => user.id
                    );
                    const addedUsers = differenceBy(
                        newUsers,
                        existingUsers,
                        (user) => user.id
                    );
                    // Update stream allocation
                    await streamModel.clearAllocation(relevantStream, user);
                    await streamModel.allocateMultiple(
                        relevantStream,
                        newUsers,
                        user
                    );
                    // Update related sessions allocation
                    const relevantSessions = await models.session.getByIds(
                        relevantStream.sessionIds,
                        user
                    );
                    await asyncForEach(relevantSessions, async (session) => {
                        const sessionAllocatedUsers =
                            await models.user.getByIds(
                                session.allocatedUserIds,
                                user
                            );
                        const allocatedUsersAfterRemove = differenceBy(
                            sessionAllocatedUsers,
                            removedUsers,
                            (user) => user.id
                        );
                        const allocatedUsersAfterAdd = [
                            ...allocatedUsersAfterRemove,
                            ...addedUsers,
                        ];
                        const finalAllocation = uniqBy(
                            allocatedUsersAfterAdd,
                            (user) => user.id
                        );
                        await models.session.clearAllocation(session, user);
                        await models.session.allocateMultiple(
                            session,
                            finalAllocation,
                            user
                        );
                    });
                }
            );
        });
        return await streamModel.getByIds(affectedStreamIds, user);
    }

    async generateSessions(
        stream: SessionStream,
        user: User,
        models: Models
    ): Promise<Session[]> {
        const allocatedUsers = await models.user.getByIds(
            stream.allocatedUserIds || [],
            user
        );
        return await models.session.createMany(
            stream.weeks.map((week) => ({
                week,
                location: stream.location,
                sessionStream: stream,
                allocatedUsers,
            })),
            user
        );
    }

    async createStreamFromInput(
        streamInput: StreamInput,
        timetable: Timetable,
        models: Models,
        user: User,
        loaders: DataLoaders,
        id?: string
    ): Promise<SessionStream | null> {
        const streamsToBeCreated: Partial<SessionStream>[] = [];
        const {
            name,
            type,
            day,
            numberOfTutorsForWeeks,
            startTime,
            endTime,
            location,
        } = streamInput;
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
            return null;
        }
        // Create root stream
        const minStaffNum = min(Array.from(numberOfStaffWeekMap.keys()))!;
        const rootStream = await models.sessionStream.create(
            {
                id,
                timetableId: timetable.id,
                name,
                type,
                day,
                startTime,
                endTime,
                weeks: Array.from(allWeeks),
                location,
                numberOfStaff: minStaffNum,
                allocatedUserIds: [],
            },
            user
        );
        numberOfStaffWeekMap.delete(minStaffNum);
        // Create all streams based on root stream
        let extraIndex = 1;
        for (const [numberOfStaff, weeks] of numberOfStaffWeekMap) {
            streamsToBeCreated.push({
                timetableId: timetable.id,
                name: `${name} extra ${extraIndex++}`,
                type,
                day,
                startTime,
                endTime,
                weeks,
                location,
                numberOfStaff: numberOfStaff - minStaffNum,
                rootId: rootStream.id,
                allocatedUserIds: [],
            });
        }
        const createdStreams = await models.sessionStream.createMany(
            streamsToBeCreated,
            user
        );
        const allStreams = [rootStream, ...createdStreams];
        await asyncForEach(
            allStreams,
            async (stream) => await this.generateSessions(stream, user, models)
        );
        loaders.sessionStream.clear(rootStream.id);
        return await models.sessionStream.getById(rootStream.id, user);
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
    async secondaryStreams(
        @Root() root: SessionStream,
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream[]> {
        return await models.sessionStream.getByIds(
            root.secondaryStreamIds,
            req.user
        );
    }

    @FieldResolver(() => SessionStream, { nullable: true })
    async root(
        @Root() root: SessionStream,
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream | null> {
        if (!root.rootId) {
            return null;
        }
        return await models.sessionStream.getById(root.rootId, req.user);
    }

    @FieldResolver(() => [User])
    async allocatedUsers(
        @Root() root: SessionStream,
        @Ctx() { req, models }: MyContext
    ): Promise<User[]> {
        return await models.user.getByIds(root.allocatedUserIds, req.user);
    }
}
