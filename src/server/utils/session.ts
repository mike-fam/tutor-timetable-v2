import { Session, SessionStream, Term } from "../entities";
import addWeeks from "date-fns/addWeeks";
import addDays from "date-fns/addDays";
import { IsoDay } from "../../types/date";

const termCache = new Map<string, Term>();
const streamCache = new Map<string, SessionStream>();

export const getSessionTime = async (session: Session) => {
    const stream: SessionStream =
        streamCache.get(session.sessionStreamId) ||
        (await session.sessionStream);
    const term: Term =
        termCache.get(stream.timetableId) ||
        (await (await stream.timetable).term);
    const day = addDays(
        addWeeks(term.startDate, session.week),
        stream.day - IsoDay.MON
    );
    return day;
};
