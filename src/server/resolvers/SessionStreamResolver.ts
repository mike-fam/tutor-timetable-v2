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
import { CourseTermIdInput } from "./CourseTermId";
import { In, IsNull } from "typeorm";
import { ArrayNotEmpty, IsEnum, Max, Min, MinLength } from "class-validator";
import { UniqueExtraWeeks, ValidExtraWeeks } from "../validators/sessionStream";
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
import { DataLoaders } from "../types/dataloaders";
import uniq from "lodash/uniq";

@InputType()
export class StreamStaffRequirement {
    @Field(() => [Int])
    @ArrayNotEmpty()
    weeks: number[];

    @Field(() => Int)
    @Min(0)
    numberOfStaff: number;

    @Field(() => [String])
    allocatedUsers: string[];
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

    @Field(() => StreamStaffRequirement)
    baseStaffRequirement: StreamStaffRequirement;

    @Field(() => [StreamStaffRequirement])
    @UniqueExtraWeeks()
    @ValidExtraWeeks()
    extraStaffRequirement: StreamStaffRequirement[];
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
        const timetables = await models.timetable.getMany(
            {
                where: courseIds.map((courseId) => ({
                    termId,
                    courseId,
                })),
            },
            req.user
        );
        const streams = await models.sessionStream.getMany(
            {
                where: timetables.map((timetable) => ({
                    timetableId: timetable.id,
                    rootId: IsNull(),
                })),
            },
            req.user
        );
        return streams;
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
            const rootStream = await streamModel.getById(streamId, user);
            // Delete all streams with allocations and create new ones with same root id
            const timetable = await models.timetable.getById(
                rootStream.timetableId,
                user
            );
            await streamModel.delete({ id: streamId }, user);
            const createdStream = await this.createStreamFromInput(
                input,
                timetable,
                models,
                user,
                loaders,
                rootStream.id
            );
            if (createdStream) {
                updatedStreams.push(createdStream);
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
        const generatedStreams: SessionStream[] = [];
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
                    numberOfStaff: 1,
                    rootId: undefined,
                    timetableId: timetable.id,
                });
                newStream.secondaryStreamIds = [];
                newStream.sessionIds = [];
                newStream.allocatedUserIds = [];
                generatedStreams.push(newStream);
            }
        }
        return generatedStreams;
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
        const {
            name,
            type,
            day,
            startTime,
            endTime,
            location,
            baseStaffRequirement,
            extraStaffRequirement,
        } = streamInput;
        let rootStream = await models.sessionStream.create(
            {
                id,
                timetableId: timetable.id,
                name,
                type,
                day,
                startTime,
                endTime,
                weeks: sortBy(uniq(baseStaffRequirement.weeks)),
                location,
                numberOfStaff: baseStaffRequirement.numberOfStaff,
            },
            user
        );
        loaders.sessionStream.clear(rootStream.id);
        rootStream = await models.sessionStream.getById(rootStream.id, user);
        await models.sessionStream.allocateMultiple(
            rootStream,
            baseStaffRequirement.allocatedUsers,
            user
        );
        const allStreams = [rootStream];
        // Create all streams based on root stream
        let extraIndex = 1;
        await asyncForEach(
            extraStaffRequirement,
            async ({ numberOfStaff, weeks, allocatedUsers }) => {
                let createdStream = await models.sessionStream.create(
                    {
                        timetableId: timetable.id,
                        name: `${name} extra ${extraIndex++}`,
                        type,
                        day,
                        startTime,
                        endTime,
                        weeks: sortBy(uniq(weeks)),
                        location,
                        numberOfStaff,
                        rootId: rootStream.id,
                    },
                    user
                );
                createdStream = await models.sessionStream.getById(
                    createdStream.id,
                    user
                );
                await models.sessionStream.allocateMultiple(
                    createdStream,
                    allocatedUsers,
                    user
                );
                allStreams.push(createdStream);
            }
        );
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
