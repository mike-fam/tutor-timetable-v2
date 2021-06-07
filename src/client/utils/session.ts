import {
    SessionAvailabilityStatus,
    SessionMap,
    SessionResponseType,
} from "../types/session";
import { TermResponseType } from "../types/term";
import getISODay from "date-fns/getISODay";
import { getCurrentWeek } from "./term";
import { isAvailable } from "./availability";
import { AvailabilityResponseType } from "../types/availability";

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
            session.allocatedUsers
                .map((allocatedUser) => allocatedUser.username)
                .includes(username) === !inverted
    );
};

export const getAvailabilityStatus = (
    session: SessionResponseType,
    sessions: SessionMap,
    username: string,
    availabilityData: AvailabilityResponseType | undefined
): SessionAvailabilityStatus => {
    const sessionsOfWeek = getSessionsOfUser(
        sessions
            .filter(
                (otherSession) =>
                    session.week === otherSession.week &&
                    session.sessionStream.day ===
                        otherSession.sessionStream.day &&
                    session.sessionStream.timetable.term.id ===
                        otherSession.sessionStream.timetable.term.id
            )
            .valueSeq()
            .toArray(),
        username
    );
    for (const otherSession of sessionsOfWeek) {
        const { startTime, endTime } = session.sessionStream;
        const {
            startTime: otherStart,
            endTime: otherEnd,
        } = otherSession.sessionStream;
        if (startTime <= otherStart && otherStart < endTime) {
            return SessionAvailabilityStatus.CLASHED;
        } else if (otherStart <= startTime && startTime < otherEnd) {
            return SessionAvailabilityStatus.CLASHED;
        }
    }
    if (availabilityData) {
        if (isAvailable(availabilityData, session)) {
            return SessionAvailabilityStatus.AVAILABLE;
        } else {
            return SessionAvailabilityStatus.UNAVAILABLE;
        }
    }
    return SessionAvailabilityStatus.UNDERTERMINED;
};
