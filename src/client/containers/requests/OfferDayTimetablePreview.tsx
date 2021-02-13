import React, { useContext, useEffect, useMemo } from "react";
import { Day } from "../../components/timetable/Day";
import { TimetableSettingsContext } from "../../utils/timetable";
import { useSessionUtils } from "../../hooks/useSessionUtils";
import { IsoDay } from "../../../types/date";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { TimetableSessionType } from "../../types/timetable";
import { Set } from "immutable";
import { Timetable } from "../../components/timetable/Timetable";
import { SimpleSession } from "../../components/timetable/SimpleSession";
import { UserContext } from "../../utils/user";
import { requestTimeslotHeight } from "../../constants/requests";

type Props = {
    sessionId: number;
};

export const OfferDayTimetablePreview: React.FC<Props> = ({ sessionId }) => {
    const { dayStartTime, dayEndTime } = useContext(TimetableSettingsContext);
    const { sessions, fetchSessions, fetchSessionById } = useSessionUtils();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!sessions.get(sessionId)) {
            fetchSessionById(sessionId);
        }
    }, [sessionId, fetchSessionById, sessions]);
    // get all other sessions on the same week
    const session = useMemo(() => sessions.get(sessionId), [
        sessions,
        sessionId,
    ]);
    // Get sessions on the same week (better to just get on teh same day)
    useEffect(() => {
        if (!session) {
            return;
        }
        fetchSessions(
            session.sessionStream.timetable.term.id,
            session.sessionStream.timetable.course.id,
            session.week
        );
    }, [sessions, session, fetchSessions]);
    // Get day of that session
    const sessionsOnDay = useMemo(
        () =>
            sessions
                .filter((otherSession) => {
                    if (session?.week !== otherSession.week) {
                        return false;
                    }
                    if (
                        session.sessionStream.day !==
                        otherSession.sessionStream.day
                    ) {
                        return false;
                    }
                    if (
                        session.sessionStream.timetable.term.id !==
                        otherSession.sessionStream.timetable.term.id
                    ) {
                        return false;
                    }
                    return otherSession.sessionAllocations.some(
                        (allocation) =>
                            allocation.user.username === user.username
                    );
                })
                .map(
                    (session): TimetableSessionType => ({
                        id: session.id,
                        startTime: session.sessionStream.startTime,
                        endTime: session.sessionStream.endTime,
                        name: session.sessionStream.name,
                        day: session.sessionStream.day,
                    })
                )
                .valueSeq()
                .toArray(),
        [sessions, session]
    );

    return (
        <Timetable
            displayedDays={Set([
                (session?.sessionStream.day || IsoDay.MON) as IsoDay,
            ])}
            renderDay={(dayProps) => (
                <Day<{}>
                    {...dayProps}
                    renderTimeSlot={() => <TimeSlot />}
                    getSessionProps={() => ({})}
                    renderSession={(sessionProps) => (
                        <SimpleSession {...sessionProps} />
                    )}
                />
            )}
            sessions={sessionsOnDay}
            startTime={dayStartTime}
            endTime={dayEndTime}
            timeslotHeight={requestTimeslotHeight}
        />
    );
};
