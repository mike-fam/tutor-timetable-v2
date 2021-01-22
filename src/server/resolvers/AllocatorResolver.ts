import {
    Arg,
    Ctx,
    Field,
    Float,
    InputType,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import { SessionType } from "../../types/session";
import { IsoDay } from "../../types/date";
import { Timetable } from "../entities";
import range from "lodash/range";
import differenceInDays from "date-fns/differenceInDays";
import { MyContext } from "../../types/context";
import axios from "axios";

type WeekId = number;
type SessionStreamId = number;
type StaffId = number;

@InputType()
class PreferenceThreshold {
    @Field(() => SessionType)
    type: SessionType;

    @Field()
    threshold: number;
}

@ObjectType()
class Allocation {
    @Field(() => Int)
    sessionStreamId: SessionStreamId;

    @Field(() => [Int])
    staffIds: Array<StaffId>;
}

@ObjectType()
class AllocatorOutput {
    @Field()
    status: string;

    @Field()
    type: string;

    @Field()
    detail: string;

    @Field()
    runtime: number;

    @Field(() => [Allocation])
    allocations: Array<Allocation>;
}

type AllocatorOutputData = {
    status: string;
    type: string;
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

@Resolver()
export class AllocatorResolver {
    @Mutation(() => AllocatorOutput)
    async requestAllocator(
        @Arg("timetableId", () => Int) timetableId: number,
        @Arg("staffIds", () => [Int]) staffIds: number[],
        @Arg("newThreshold", () => Float, { nullable: true })
        newThreshold: number | undefined,
        @Ctx() { req }: MyContext
    ): Promise<AllocatorOutput> {
        const timetable = await Timetable.findOneOrFail({
            id: timetableId,
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
        const output = new AllocatorOutput();
        output.allocations = Object.entries(
            allocatorOutput.data.allocations
        ).map(([streamId, staffIds]) => ({
            sessionStreamId: parseInt(streamId),
            staffIds,
        }));
        output.status = allocatorOutput.data.status;
        output.detail = allocatorOutput.data.detail;
        output.type = allocatorOutput.data.type;
        output.runtime = allocatorOutput.data.runtime;
        return output;
    }
}
