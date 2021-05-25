import ical, { ICalCalendar } from "ical-generator";
import { Course, Session, SessionStream, Term, Timetable } from "../entities";
import addWeeks from "date-fns/addWeeks";
import startOfISOWeek from "date-fns/startOfISOWeek";
import addDays from "date-fns/addDays";
import { setDateHours } from "./helpers";

const calendar = ical({ name: "my first iCal" });
calendar.createEvent({
    start: new Date(),
    end: new Date(),
    summary: "Example Event",
    description: "It works ;)",
    location: "my room",
    url: "http://sebbo.net/",
});

export class IcalGenerator {
    private readonly calendar: ICalCalendar;

    public constructor() {
        this.calendar = ical();
    }

    public async loadTimetable(timetable: Timetable): Promise<void> {}

    public addSessionSync(
        session: Session,
        stream: SessionStream,
        term: Term,
        course: Course
    ): void {
        // TODO: get date, course of session
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
            description: "TODO", // TODO
            location: session.location,
        });
    }

    public async addSession(session: Session): Promise<void> {}
}
