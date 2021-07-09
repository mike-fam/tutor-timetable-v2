import {
    Arg,
    Ctx,
    Field,
    Float,
    Mutation,
    ObjectType,
    Resolver,
} from "type-graphql";
import { SessionType } from "../types/session";
import { IsoDay } from "../../types/date";
import { SessionStream, User } from "../entities";
import range from "lodash/range";
import { MyContext } from "../types/context";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { CourseTermIdInput } from "./CourseTermId";
import { asyncForEach, asyncMap } from "../../utils/array";
import { isNumeric } from "../../utils/string";
import asyncFilter from "node-filter-async";

type WeekId = number;
type SessionStreamId = string;
type StaffId = string;

@ObjectType()
class Allocation {
    @Field(() => SessionStream)
    sessionStream: SessionStream;

    @Field(() => [User])
    staff: Array<User>;
}

export enum AllocationType {
    Success = "success",
    Failed = "failed",
}

export enum AllocationStatus {
    Optimal = "Optimal solution found",
    Infeasible = "Infeasible model",
}

@ObjectType()
class AllocatorOutput {
    @Field(() => AllocationStatus)
    status: AllocationStatus;

    @Field(() => AllocationType)
    type: AllocationType;

    @Field()
    token: string;

    @Field()
    detail: string;

    @Field()
    runtime: number;

    @Field(() => [Allocation])
    allocations: Array<Allocation>;
}

type AllocatorOutputData = {
    status: AllocationStatus;
    type: AllocationType;
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
};

@Resolver()
export class AllocatorResolver {
    @Mutation(() => AllocatorOutput, {nullable: true})
    async requestAllocation(
        @Arg("courseTermInput", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput,
        @Arg("staffIds", () => [String]) staffIds: string[],
        @Arg("newThreshold", () => Float, { nullable: true })
        newThreshold: number | undefined,
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
            requester: req.user!.username,
            data: {
                weeks: weeksInput,
                session_streams: sessionStreamsInput,
                staff: staffInput,
                new_threshold: newThreshold,
            },
            token
        };
        const allocatorOutput = await axios.post<AllocatorOutputData>(
            process.env.ALLOCATOR_URL || "http://localhost:8000/allocator/",
            input
        );
        await models.timetable.update(
            timetable,
            { allocationToken: token },
            user
        );
        const output = new AllocatorOutput();
        output.allocations = await asyncMap(
            Object.entries(allocatorOutput.data.allocations),
            async ([streamId, staffIds]) => {
                return {
                    sessionStream: await models.sessionStream.getById(
                        streamId,
                        user
                    ),
                    staff: [...(await models.user.getByIds(staffIds, user))],
                };
            }
        );
        output.status = allocatorOutput.data.status;
        output.detail = allocatorOutput.data.detail;
        output.type = allocatorOutput.data.type;
        output.runtime = allocatorOutput.data.runtime;
        output.token = token;
        return output;
    }

    @Mutation(() => Boolean)
    async applyAllocation(
        @Arg("allocationToken") token: string,
        @Arg("override", () => Boolean) override: boolean,
        @Ctx() { req, models }: MyContext
    ): Promise<boolean> {
        const { user } = req;
        let timetable;
        try {
            timetable = await models.timetable.get(
                { allocationToken: token },
                user
            );
        } catch (e) {
            throw new Error("Invalid token or token already consumed.");
        }
        console.log(1);
        const { data: allocationOutput } = await axios.get<AllocatorOutputData>(
            process.env.ALLOCATOR_URL ||
            `http://localhost:8000/allocator/${token}`,
        );
        console.log(2);
        if (allocationOutput.type === AllocationType.Failed) {
            throw new Error("You cannot apply a failed allocation");
        }
        const sessionStreams = await models.sessionStream.getByIds(
            timetable.sessionStreamIds,
            user
        );
        console.log(3);
        const hasAllocation = sessionStreams.some(
            (stream) => stream.allocatedUserIds.length > 0
        );
        if (!override && hasAllocation) {
            throw new Error(
                "This timetable already has an allocation." +
                    " If you want to force apply this allocation" +
                    " and override the existing timetable, set 'override' to true"
            );
        }
        console.log(4);
        // Delete existing allocations
        await asyncForEach(
            sessionStreams,
            async (stream) =>
                await models.sessionStream.clearAllocation(stream, user)
        );
        const streamIds = Object.keys(allocationOutput.allocations);
        const streams = await models.sessionStream.getByIds(streamIds, user);
        console.log(5);
        // Create new allocation for streams
        await asyncForEach(streams, async (stream) => {
            const staffIds = allocationOutput.allocations[stream.id];
            const realStaffIds = staffIds.filter((id) => !isNumeric(id));
            const staff = await models.user.getByIds(realStaffIds, user);
            await models.sessionStream.allocateMultiple(stream, staff, user);
        });
        console.log(6);

        // Change all affected sessions
        const sessionIds = streams.reduce<string[]>(
            (sessionIds, stream) => [...sessionIds, ...stream.sessionIds],
            []
        );
        const sessions = await models.session.getByIds(sessionIds, user);
        console.log(7);
        const today = new Date();
        const sessionsAfterToday = await asyncFilter(
            sessions,
            async (session) =>
                (await session.date()).getTime() > today.getTime()
        );
        // Delete existing session allocations
        await asyncForEach(
            sessionsAfterToday,
            async (session) =>
                await models.session.clearAllocation(session, user)
        );
        console.log(8);
        // Create new allocation
        await asyncForEach(sessionsAfterToday, async (session) => {
            const staffIds =
                allocationOutput.allocations[session.sessionStreamId];
            const realStaffIds = staffIds.filter((id) => !isNumeric(id));
            const staff = await models.user.getByIds(realStaffIds, user);
            await models.session.allocateMultiple(session, staff, user);
        });
        console.log(9);
        return true;
    }
}
