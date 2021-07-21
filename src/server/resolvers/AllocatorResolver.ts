import {
    Arg,
    Ctx,
    Field,
    Int,
    Mutation,
    ObjectType,
    Resolver,
} from "type-graphql";
import { SessionType } from "../types/session";
import { IsoDay } from "../../types/date";
import range from "lodash/range";
import { MyContext } from "../types/context";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { CourseTermIdInput } from "./CourseTermId";
import { CourseStaff, SessionStream, Term, Timetable, User } from "../entities";
import { Models } from "../types/models";
import parseISO from "date-fns/parseISO";
import differenceInSeconds from "date-fns/differenceInSeconds";

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

export enum AllocationStatus {
    REQUESTED = "REQUESTED",
    NOT_READY = "NOT_READY",
    ERROR = "ERROR",
    GENERATED = "GENERATED",
}

@ObjectType()
class AllocatorOutput {
    @Field(() => AllocationStatus)
    status: AllocationStatus;

    @Field()
    message: string;

    @Field(() => BaseGeneratedAllocationPattern)
    baseAllocation: BaseGeneratedAllocationPattern;

    @Field(() => [ExtraGeneratedAllocationPattern])
    extraAllocations: ExtraGeneratedAllocationPattern[];
}

type AllocatorOutputData = {
    status: AllocationStatus;
    detail: string;
    runtime: number;
    allocations: {
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
    start_time: number;
    end_time: number;
    number_of_tutors: number;
    location: string;
    day: IsoDay;
    weeks: Array<WeekId>;
};

type TimeslotInput = {
    start_time: number;
    end_time: number;
};

type StaffInput = {
    id: StaffId;
    name: string;
    new: boolean;
    type_preference?: SessionType;
    max_contiguous_hours?: number;
    max_weekly_hours?: number;
    availabilities: { [key in IsoDay]?: Array<TimeslotInput> };
};

type AllocatorInputData = {
    weeks: Array<WeekInput>;
    session_streams: Array<SessionStreamInput>;
    staff: Array<StaffInput>;
    new_threshold?: number;
};

type AllocatorInput = {
    request_time: string;
    requester: string;
    data: AllocatorInputData;
    token: string;
    timeout: number;
};

@Resolver()
export class AllocatorResolver {
    @Mutation(() => AllocatorOutput)
    async requestAllocation(
        @Arg("courseTermInput", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput,
        @Arg("staffIds", () => [String]) staffIds: string[],
        @Arg("timeout") timeout: number,
        @Ctx() { req, models }: MyContext
    ): Promise<AllocatorOutput> {
        // TODO: This method should return the status of the request, can be one of
        //  requested, not yet done, error, or generated
        // TODO:
        //  If already created, get and check redis store.
        //  if allocation is generated less than {time limit} ago, use
        //  if allocation is generated more than {time limit} ago,
        //  request new allocation with new token

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
        // checks if token is already created and get time of token
        const existingToken = timetable.allocationToken;
        const output = new AllocatorOutput();
        //  If not created, create a new token and mark timestamp
        if (!existingToken) {
            output.baseAllocation = new BaseGeneratedAllocationPattern();
            output.baseAllocation.allocatedUsers = [];
            output.extraAllocations = [];
            output.message =
                "A request to generate a new allocation has been made.";
            const status = await this.requestNewAllocation(
                timetable,
                term,
                sessionStreams,
                courseStaffs,
                staffIds,
                timeout,
                models,
                user
            );
            output.status =
                status === 200
                    ? AllocationStatus.REQUESTED
                    : AllocationStatus.ERROR;
            return output;
        } else {
            const [token, timestamp, timeout] = existingToken.split(":");
            const timestampDate = parseISO(timestamp);
            const now = new Date();
            const elapsedTime = differenceInSeconds(now, timestampDate);
            const timeoutSeconds = parseInt(timeout);
            // If allocation generated a long time ago
            if (elapsedTime > Math.max(3600, timeoutSeconds * 2)) {
                const status = await this.requestNewAllocation(
                    timetable,
                    term,
                    sessionStreams,
                    courseStaffs,
                    staffIds,
                    timeoutSeconds,
                    models,
                    user
                );
            }
        }
        output.baseAllocation = new BaseGeneratedAllocationPattern();
        output.message = "";
        output.baseAllocation.allocatedUsers = [];
        output.extraAllocations = [];
        output.status = AllocationStatus.REQUESTED;
        return output;
    }

    async requestNewAllocation(
        timetable: Timetable,
        term: Term,
        sessionStreams: SessionStream[],
        courseStaffs: CourseStaff[],
        staffIds: string[],
        timeout: number,
        models: Models,
        user: User
    ): Promise<number> {
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
                start_time: sessionStream.startTime,
                end_time: sessionStream.endTime,
                number_of_tutors: sessionStream.numberOfStaff,
                day: sessionStream.day,
                weeks: sessionStream.weeks,
                location: sessionStream.location,
            })
        );
        const staffInput: StaffInput[] = (
            await Promise.all(
                courseStaffs.map(async (courseStaff) => {
                    const user = await courseStaff.user;
                    const preference = await courseStaff.preference;
                    const availabilities = await user.availabilities;
                    return {
                        id: user.id,
                        name: user.name,
                        new: courseStaff.isNew,
                        type_preference: preference?.sessionType,
                        max_contiguous_hours: preference?.maxContigHours,
                        max_weekly_hours: preference?.maxWeeklyHours,
                        availabilities: availabilities.reduce<
                            {
                                [key in IsoDay]?: Array<TimeslotInput>;
                            }
                        >((availabilities, timeSlot) => {
                            return {
                                ...availabilities,
                                [timeSlot.day]: [
                                    ...(availabilities[timeSlot.day] || []),
                                    {
                                        start_time: timeSlot.startTime,
                                        end_time: timeSlot.endTime,
                                    },
                                ],
                            };
                        }, {}),
                    };
                })
            )
        ).filter((staffInput) => staffIds.includes(staffInput.id));
        const token = uuid();
        const input: AllocatorInput = {
            request_time: new Date().toISOString(),
            requester: user.username,
            data: {
                weeks: weeksInput,
                session_streams: sessionStreamsInput,
                staff: staffInput,
            },
            token,
            timeout,
        };
        const allocatorResponse = await axios.post<AllocatorOutputData>(
            `${process.env.ALLOCATOR_URL}request-allocation/` ||
                "http://localhost:8000/allocator/request-allocation/",
            input
        );
        await models.timetable.update(
            timetable,
            {
                allocationToken: `${token}:${new Date().toISOString()}:${timeout}`,
            },
            user
        );
        return allocatorResponse.status;
    }
}
