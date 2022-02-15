import {
    Arg,
    Ctx,
    Field,
    InputType,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import { SessionType } from "../types/session";
import { IsoDay } from "../../types/date";
import range from "lodash/range";
import { MyContext } from "../types/context";
import axios from "axios";
import { CourseTermIdInput } from "./CourseTermId";
import { CourseStaff, SessionStream, Term, Timetable, User } from "../entities";
import { Models } from "../types/models";
import { Max } from "class-validator";
import keyBy from "lodash/keyBy";
import { asyncMap } from "../../utils/array";

type WeekId = number;
type SessionStreamId = string;
type StaffId = string;

@ObjectType()
class BaseGeneratedAllocationPattern {
    @Field(() => [String])
    allocatedUsers: string[];
}

@ObjectType()
class ExtraGeneratedAllocationPattern extends BaseGeneratedAllocationPattern {
    @Field(() => [Int])
    weeks: number[];
}

@ObjectType()
class AllocatorStream {
    @Field()
    streamId: string;

    @Field(() => BaseGeneratedAllocationPattern)
    baseAllocation: BaseGeneratedAllocationPattern;

    @Field(() => [ExtraGeneratedAllocationPattern])
    extraAllocations: ExtraGeneratedAllocationPattern[];
}

export enum AllocationStatus {
    REQUESTED = "REQUESTED",
    NOT_READY = "NOT_READY",
    NOT_EXIST = "NOT_EXIST",
    ERROR = "ERROR",
    GENERATED = "GENERATED",
    FAILED = "FAILED",
}

@ObjectType()
class AllocatorOutput {
    @Field(() => AllocationStatus)
    type: AllocationStatus;

    @Field()
    title: string;

    @Field()
    message: string;

    @Field(() => [AllocatorStream])
    allocatedStreams: AllocatorStream[];
}

@InputType()
class RequestAllocationInput extends CourseTermIdInput {
    @Field(() => [String])
    staffIds: string[];

    @Field(() => Int)
    @Max(14400)
    timeout: number;
}

type AllocatorOutputData = {
    type: AllocationStatus;
    title: string;
    message: string;
    result?: {
        [key: string]: Array<string>;
    };
};

type WeekInput = {
    id: WeekId;
    name: string;
};

type SessionStreamInput = {
    id: SessionStreamId;
    name: string;
    type: SessionType;
    time: [number, number];
    number_of_tutors: number;
    location: string;
    day: IsoDay;
    weeks: Array<WeekId>;
    is_root: boolean;
};

type AvailabilityInput = { [key in IsoDay]?: Array<[number, number]> };

type StaffInput = {
    id: StaffId;
    name: string;
    new: boolean;
    type_preference?: SessionType;
    max_contiguous_hours?: number;
    max_weekly_hours?: number;
    availabilities: AvailabilityInput;
};

type AllocatorInputData = {
    timetable_id: string;
    weeks: Array<WeekInput>;
    session_streams: Array<SessionStreamInput>;
    staff: Array<StaffInput>;
    new_threshold?: number;
    timeout: number;
};

type AllocatorInput = {
    request_time: string;
    requester: string;
    data: AllocatorInputData;
};

@Resolver()
export class AllocatorResolver {
    @Mutation(() => AllocatorOutput)
    async requestAllocation(
        @Arg("requestAllocationInput", () => RequestAllocationInput)
        { courseId, termId, staffIds, timeout }: RequestAllocationInput,
        @Ctx() { req, models }: MyContext
    ): Promise<AllocatorOutput> {
        const { user } = req;
        const timetable = await models.timetable.get(
            {
                courseId,
                termId,
            },
            user
        );
        const sessionStreams = await models.sessionStream.getByIds(
            timetable.sessionStreamIds,
            user
        );
        const term = await models.term.getById(termId, user);
        const courseStaffs = await models.courseStaff.getByIds(
            timetable.courseStaffIds,
            user
        );
        // Request allocation
        const allocationData = await this.requestNewAllocation(
            timetable,
            term,
            sessionStreams,
            courseStaffs,
            staffIds,
            timeout,
            models,
            user
        );
        return AllocatorResolver.allocationDataToOutput(
            allocationData,
            sessionStreams
        );
    }

    @Query(() => AllocatorOutput)
    async checkAllocation(
        @Arg("timetableInput") { courseId, termId }: CourseTermIdInput,
        @Ctx() { req, models }: MyContext
    ): Promise<AllocatorOutput> {
        const { user } = req;
        const timetable = await models.timetable.get(
            {
                courseId,
                termId,
            },
            user
        );
        const sessionStreams = await models.sessionStream.getByIds(
            timetable.sessionStreamIds,
            user
        );
        // Check allocation
        const allocationResponse = await axios.get<AllocatorOutputData>(
            `${process.env.ALLOCATOR_URL}/check-allocation/${timetable.id}`
        );
        return AllocatorResolver.allocationDataToOutput(
            allocationResponse.data,
            sessionStreams
        );
    }

    private static allocationDataToOutput(
        allocationData: AllocatorOutputData,
        sessionStreams: SessionStream[]
    ): AllocatorOutput {
        const output = new AllocatorOutput();
        output.title = allocationData.title;
        output.type = allocationData.type;
        output.message = allocationData.message;
        output.allocatedStreams = [];
        if (allocationData.result) {
            const streamByIds = keyBy(sessionStreams, (stream) => stream.id);
            const generatedAllocations = allocationData.result;
            const rootStreams = sessionStreams.filter(
                (stream) => !stream.rootId
            );
            for (const rootStream of rootStreams) {
                const allocatorStream = new AllocatorStream();
                allocatorStream.streamId = rootStream.id;
                allocatorStream.baseAllocation =
                    new BaseGeneratedAllocationPattern();
                allocatorStream.baseAllocation.allocatedUsers =
                    generatedAllocations[rootStream.id] || [];
                allocatorStream.extraAllocations = [];
                for (const secondaryStreamId of rootStream.secondaryStreamIds) {
                    const secondaryAllocation =
                        new ExtraGeneratedAllocationPattern();
                    secondaryAllocation.weeks =
                        streamByIds[secondaryStreamId].weeks;
                    secondaryAllocation.allocatedUsers =
                        generatedAllocations[secondaryStreamId] || [];
                    allocatorStream.extraAllocations.push(secondaryAllocation);
                }
                output.allocatedStreams.push(allocatorStream);
            }
        }
        return output;
    }

    private async requestNewAllocation(
        timetable: Timetable,
        term: Term,
        sessionStreams: SessionStream[],
        courseStaffs: CourseStaff[],
        staffIds: string[],
        timeout: number,
        models: Models,
        user: User
    ): Promise<AllocatorOutputData> {
        const weeks = range(0, term.numberOfWeeks());
        const weeksInput: WeekInput[] = weeks.map((weekNum) => ({
            id: weekNum,
            name: term.weekNames[weekNum] || `Week [${weekNum}]`,
        }));
        const sessionStreamsInput: SessionStreamInput[] = sessionStreams.map(
            (sessionStream) => ({
                id: sessionStream.id,
                name: sessionStream.name,
                type: sessionStream.type,
                time: [sessionStream.startTime, sessionStream.endTime],
                number_of_tutors: sessionStream.numberOfStaff,
                day: sessionStream.day,
                weeks: sessionStream.weeks,
                location: sessionStream.location,
                is_root: !sessionStream.rootId,
            })
        );
        const staffInput: StaffInput[] = (
            await asyncMap(courseStaffs, async (courseStaff) => {
                const staffMember = await models.user.getById(
                    courseStaff.userId,
                    user
                );
                const preference = await models.preference.getIfExists(
                    { id: courseStaff.preferenceId },
                    user
                );
                const availabilities = await models.timeslot.getByIds(
                    staffMember.timeslotIds,
                    user
                );
                return {
                    id: staffMember.id,
                    name: staffMember.name,
                    new: courseStaff.isNew,
                    type_preference: preference?.sessionType,
                    max_contiguous_hours: preference?.maxContigHours,
                    max_weekly_hours: preference?.maxWeeklyHours,
                    availabilities: availabilities.reduce<AvailabilityInput>(
                        (availabilities, timeSlot) => {
                            return {
                                ...availabilities,
                                [timeSlot.day]: [
                                    ...(availabilities[timeSlot.day] || []),
                                    [timeSlot.startTime, timeSlot.endTime],
                                ],
                            };
                        },
                        {}
                    ),
                };
            })
        ).filter((staffInput) => staffIds.includes(staffInput.id));
        const input: AllocatorInput = {
            request_time: new Date().toISOString(),
            requester: user.username,
            data: {
                timetable_id: timetable.id,
                weeks: weeksInput,
                session_streams: sessionStreamsInput,
                staff: staffInput,
                timeout,
            },
        };
        const allocatorResponse = await axios.post<AllocatorOutputData>(
            `${process.env.ALLOCATOR_URL}/request-allocation/`,
            input
        );
        return allocatorResponse.data;
    }
}
