import {
    Arg,
    Ctx,
    Field,
    Float,
    Int,
    Mutation,
    ObjectType,
    Resolver,
} from "type-graphql";
import { SessionType } from "../types/session";
import { IsoDay } from "../../types/date";
import {
    Session,
    SessionAllocation,
    SessionStream,
    StreamAllocation,
    Timetable,
    User,
} from "../entities";
import range from "lodash/range";
import differenceInDays from "date-fns/differenceInDays";
import { MyContext } from "../types/context";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { CourseTermIdInput } from "./CourseTermId";
import { Role } from "../types/user";
import { getSessionTime } from "../utils/session";
import asyncFilter from "node-filter-async";
import { asyncMap } from "../../utils/array";

type WeekId = number;
type SessionStreamId = number;
type StaffId = number;

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
        [key: number]: Array<number>;
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
};

const allocationTokenManager = new Map<
    string,
    [number, number, AllocatorOutputData]
>();

@Resolver()
export class AllocatorResolver {
    @Mutation(() => AllocatorOutput)
    async requestAllocation(
        @Arg("courseTermInput", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput,
        @Arg("staffIds", () => [Int]) staffIds: number[],
        @Arg("newThreshold", () => Float, { nullable: true })
        newThreshold: number | undefined,
        @Ctx() { req }: MyContext
    ): Promise<AllocatorOutput> {
        const timetable = await Timetable.findOneOrFail({
            courseId,
            termId,
        });
        const sessionStreams = await timetable.sessionStreams;
        const term = await timetable.term;
        const courseStaffs = await timetable.courseStaffs;
        const weeks = range(
            0,
            Math.ceil(differenceInDays(term.endDate, term.startDate) / 7)
        );
        const weeksInput: WeekInput[] = weeks.map((weekId) => ({
            id: weekId,
            name: term.weekNames[weekId] || `Week [${weekId}]`,
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
        const input: AllocatorInput = {
            request_time: new Date().toISOString(),
            requester: req.user!.username,
            data: {
                weeks: weeksInput,
                session_streams: sessionStreamsInput,
                staff: staffInput,
                new_threshold: newThreshold,
            },
        };
        const allocatorOutput = await axios.post<AllocatorOutputData>(
            process.env.ALLOCATOR_URL || "http://localhost:8000/allocator/",
            input
        );
        const token = uuid();
        allocationTokenManager.set(token, [
            courseId,
            termId,
            allocatorOutput.data,
        ]);
        const output = new AllocatorOutput();
        output.allocations = await asyncMap(
            Object.entries(allocatorOutput.data.allocations),
            async ([streamId, staffIds]) => {
                const dummyIds = staffIds.filter((staffId) => staffId < 0);
                const realIds = staffIds.filter((staffId) => staffId > 0);
                return {
                    sessionStream: await SessionStream.findOneOrFail(
                        parseInt(streamId)
                    ),
                    staff: [
                        ...(await User.findByIds(realIds)),
                        ...User.create(
                            dummyIds.map((staffId) => ({
                                id: staffId,
                                username: `dummy${-staffId}`,
                                name: `Dummy Guy ${-staffId}`,
                                email: "dummy.guy@email.com",
                            }))
                        ),
                    ],
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
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const allocationEntry = allocationTokenManager.get(token);
        if (!allocationEntry) {
            throw new Error("Invalid token or token already consumed.");
        }
        const [courseId, termId, allocationOutput] = allocationEntry;
        if (allocationOutput.type === AllocationType.Failed) {
            throw new Error("You cannot apply a failed allocation");
        }
        const allocatedTimetable = await Timetable.findOneOrFail({
            courseId,
            termId,
        });
        const userCourseCoordinatorPermissions = (
            await req.user!.courseStaffs
        ).filter((courseStaff) => courseStaff.role === Role.COURSE_COORDINATOR);
        if (
            userCourseCoordinatorPermissions.every(
                (courseStaff) =>
                    courseStaff.timetableId !== allocatedTimetable.id
            )
        ) {
            throw new Error("You don't have permission to perform this action");
        }
        const streamAllocationsToBeSaved: StreamAllocation[] = [];
        const sessionAllocationsToBeSaved: SessionAllocation[] = [];
        const sessionStreams = await SessionStream.findByIds(
            Object.keys(allocationOutput.allocations).map((id) => parseInt(id))
        );
        const hasAllocation = (
            await Promise.all(
                sessionStreams.map(
                    async (stream) =>
                        (await stream.streamAllocations).length > 0
                )
            )
        ).some((value) => value);
        if (!override && hasAllocation) {
            throw new Error(
                "This timetable already has an allocation." +
                    " If you want to force apply this allocation" +
                    " and override the existing timetable, set 'override' to true"
            );
        }
        // Delete existing allocations
        const streamAllocationToDelete = await StreamAllocation.find({
            where: sessionStreams.map((stream) => ({
                sessionStreamId: stream.id,
            })),
        });
        if (streamAllocationToDelete.length > 0) {
            await StreamAllocation.delete(
                streamAllocationToDelete.map((allocation) => allocation.id)
            );
        }

        // Create new allocation
        for (const [sessionStreamId, staffIds] of Object.entries(
            allocationOutput.allocations
        )) {
            for (const userId of staffIds) {
                if (userId < 0) {
                    continue;
                }
                streamAllocationsToBeSaved.push(
                    StreamAllocation.create({
                        sessionStreamId: parseInt(sessionStreamId),
                        userId,
                    })
                );
            }
        }
        await StreamAllocation.save(streamAllocationsToBeSaved);

        // Change all affected sessions
        const today = new Date();
        const affectedSessions = await Session.find({
            where: sessionStreams.map((stream) => ({
                sessionStreamId: stream.id,
            })),
        });
        const sessionsAfterToday = await asyncFilter(
            affectedSessions,
            async (session) => {
                return (
                    (await getSessionTime(session)).getTime() -
                        today.getTime() >
                    0
                );
            }
        );
        // Delete existing session allocations
        const sessionAllocationToDelete = await SessionAllocation.find({
            where: sessionsAfterToday.map((session) => ({
                sessionId: session.id,
            })),
        });
        if (sessionAllocationToDelete.length > 0) {
            await SessionAllocation.delete(
                sessionAllocationToDelete.map((allocation) => allocation.id)
            );
        }

        // Create new allocation
        for (const session of affectedSessions) {
            const staffIds =
                allocationOutput.allocations[session.sessionStreamId];
            for (const userId of staffIds) {
                if (userId < 0) {
                    continue;
                }
                sessionAllocationsToBeSaved.push(
                    SessionAllocation.create({
                        sessionId: session.id,
                        userId,
                    })
                );
            }
        }
        await SessionAllocation.save(sessionAllocationsToBeSaved);
        allocationTokenManager.delete(token);
        return true;
    }
}
