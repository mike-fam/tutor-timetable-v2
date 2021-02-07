import { SessionResponseType } from "../types/session";
import { TermResponseType } from "../types/term";
import getISODay from "date-fns/getISODay";
import { getCurrentWeek } from "./term";

export const isSessionPast = (
    session: SessionResponseType,
    term?: TermResponseType
) => {
    if (!term) {
        return true;
    }
    const currentWeek = getCurrentWeek(term);
    if (session.week < currentWeek) {
        return true;
    } else {
        return (
            session.week === currentWeek &&
            session.sessionStream.day < getISODay(new Date())
        );
    }
};

export const getSessionsOfUser = (
    sessions: Array<SessionResponseType>,
    username: string,
    inverted: boolean = false
) => {
    return sessions.filter(
        (session) =>
            session.sessionAllocations
                .map((allocation) => allocation.user.username)
                .includes(username) === !inverted
    );
};
