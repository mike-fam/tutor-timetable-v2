import React, { useContext, useEffect, useMemo } from "react";
import { Day } from "../../components/timetable/Day";
import { TimetableSettingsContext } from "../../utils/timetable";
import { useSessionUtils } from "../../hooks/useSessionUtils";
import { IsoDay } from "../../../types/date";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { SessionTheme, TimetableSessionType } from "../../types/timetable";
import { Set } from "immutable";
import { Timetable } from "../../components/timetable/Timetable";
import { SimpleSession } from "../../components/timetable/SimpleSession";
import { UserContext } from "../../utils/user";
import { requestTimeslotHeight } from "../../constants/requests";
import { notSet } from "../../constants";

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
            sessions.filter((otherSession) => {
                if (session?.week !== otherSession.week) {
                    return false;
                }
                if (
                    session.sessionStream.day !== otherSession.sessionStream.day
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
                    (allocation) => allocation.user.username === user.username
                );
            }),
        [sessions, user.username, session]
    );
    const timetableSessionsOnDay = useMemo(
        () =>
            sessionsOnDay
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
        [sessionsOnDay]
    );
    const isClashed = useMemo(() => {
        if (!session) {
            return true;
        }
        for (const [, otherSession] of sessionsOnDay) {
            const { startTime, endTime } = session.sessionStream;
            const {
                startTime: otherStart,
                endTime: otherEnd,
            } = otherSession.sessionStream;
            if (startTime <= otherStart && otherStart < endTime) {
                return true;
            } else if (otherStart <= startTime && startTime < otherEnd) {
                return true;
            }
        }
        return false;
    }, [session, sessionsOnDay]);

    // TODO: Use interactive timetable component
    return (
        <>
            <Timetable
                displayedDays={Set([
                    (session?.sessionStream.day || IsoDay.MON) as IsoDay,
                ])}
                renderDay={(dayProps) => (
                    <Day<{ theme: SessionTheme }>
                        {...dayProps}
                        renderTimeSlot={(key) => <TimeSlot key={key} />}
                        getSessionProps={(sessionId) => ({
                            theme:
                                sessionId !== session?.id
                                    ? SessionTheme.PRIMARY
                                    : isClashed
                                    ? SessionTheme.ERROR
                                    : SessionTheme.SUCCESS,
                        })}
                        renderSession={(sessionProps, key, moreProps) => (
                            <SimpleSession
                                {...sessionProps}
                                {...moreProps}
                                key={key}
                            />
                        )}
                    />
                )}
                sessions={[
                    ...timetableSessionsOnDay,
                    {
                        id: session?.id || notSet,
                        startTime: session?.sessionStream.startTime || 0,
                        endTime: session?.sessionStream.endTime || 0,
                        name: session?.sessionStream.name || "",
                        day:
                            (session?.sessionStream.day as IsoDay) ||
                            IsoDay.SUN,
                    },
                ]}
                startTime={dayStartTime}
                endTime={dayEndTime}
                timeslotHeight={requestTimeslotHeight}
            />
        </>
    );
};
