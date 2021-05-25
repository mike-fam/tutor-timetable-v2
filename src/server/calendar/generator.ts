import ical, { ICalCalendar } from "ical-generator";
import { Session, Timetable } from "../entities";
import addWeeks from "date-fns/addWeeks";
import startOfISOWeek from "date-fns/startOfISOWeek";
import addDays from "date-fns/addDays";
import { setDateHours } from "./helpers";
import { asyncMap } from "../../utils/array";

// TODO: Fix calculating session date
export class ICalGenerator {
    private readonly calendar: ICalCalendar;

    public constructor() {
        this.calendar = ical();
    }

    public async loadTimetable(timetable: Timetable): Promise<void> {
        // TODO: cache here as well
        const term = await timetable.term;
        const course = await timetable.course;
        this.calendar.name(`${course.code}, ${term.type} ${term.year}`);
        const streams = await timetable.sessionStreams;
        for (const stream of streams) {
            const sessions = await stream.sessions;
            for (const session of sessions) {
                await this.addSession(session);
            }
        }
    }

    public async addSession(session: Session): Promise<void> {
        // TODO: this needs to be cached, maybe using dataloaders
        const stream = await session.sessionStream;
        const timetable = await stream.timetable;
        const course = await timetable.course;
        const term = await timetable.term;
        // TODO: get all allocated tutors of the same stream
        const allocations = await session.sessionAllocations;
        const allocatedStaffNames = await asyncMap(
            allocations,
            async (allocation) => {
                const staffMember = await allocation.user;
                return staffMember.name;
            }
        );
        const termStart = startOfISOWeek(term.startDate);
        const sessionDate = addDays(
            addWeeks(termStart, session.week),
            stream.day - 1
        );
        const startDate = setDateHours(sessionDate, stream.startTime);
        const endDate = setDateHours(sessionDate, stream.endTime);

        this.calendar.createEvent({
            start: startDate,
            end: endDate,
            summary: `${course.code} ${stream.name}`,
            description: ["Allocation:", ...allocatedStaffNames].join("\n"),
            location: session.location,
        });
    }

    public getCalendar(): ICalCalendar {
        return this.calendar;
    }
}
