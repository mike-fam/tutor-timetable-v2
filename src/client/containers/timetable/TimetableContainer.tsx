import React, { useContext, useEffect, useMemo, useState } from "react";
import { Timetable } from "../../components/timetable/Timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import {
    TimetableContext,
    TimetableSettingsContext,
} from "../../utils/timetable";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { useGetSessionStreamsQuery } from "../../generated/graphql";
import { Loadable } from "../../components/helpers/Loadable";
import { IsoDay } from "../../../types/date";
import {
    TimetableSession,
    TimetableSessionProps,
} from "../../components/timetable/TimetableSession";
import { Map } from "immutable";
import { notSet } from "../../constants";
import { SessionsContext } from "../../hooks/useSessionUtils";

type Props = {};

export const TimetableContainer: React.FC<Props> = () => {
    const [sessionInfo, setSessionsInfo] = useState<
        Map<number, TimetableSessionProps>
    >(Map());
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    const { chosenTermId, chosenWeek, chosenCourses } = useContext(
        TimetableContext
    );
    // TODO: Use lazy query
    const { fetchSessions, sessionsData } = useContext(SessionsContext);
    const {
        data: sessionStreamsData,
        loading: sessionStreamsLoading,
    } = useQueryWithError(useGetSessionStreamsQuery, {
        termId: chosenTermId,
        courseIds: chosenCourses.toArray(),
    });
    const sessions = useMemo(() => {
        if (chosenWeek === notSet) {
            if (sessionStreamsLoading || !sessionStreamsData) {
                return [];
            }
            return sessionStreamsData.sessionStreams.map((sessionStream) => ({
                id: sessionStream.id,
                name: sessionStream.name,
                startTime: sessionStream.startTime,
                endTime: sessionStream.endTime,
                day: sessionStream.day,
                location: sessionStream.location,
                allocation: sessionStream.streamAllocations.map(
                    (allocation) => allocation.user.name
                ),
            }));
        } else {
            if (!sessionsData) {
                return [];
            }
            return sessionsData.sessions.map((session) => ({
                id: session.id,
                name: session.sessionStream.name,
                startTime: session.sessionStream.startTime,
                endTime: session.sessionStream.endTime,
                day: session.sessionStream.day as IsoDay,
                location: session.location,
                allocation: session.sessionAllocations.map(
                    (allocation) => allocation.user.name
                ),
            }));
        }
    }, [chosenWeek, sessionsData, sessionStreamsData, sessionStreamsLoading]);
    useEffect(() => {
        if (
            chosenTermId === notSet ||
            chosenCourses.size === 0 ||
            chosenWeek === notSet
        ) {
            return;
        }
        chosenCourses.forEach((courseId) => {
            fetchSessions(chosenTermId, courseId, chosenWeek);
        });
    }, [chosenTermId, chosenCourses, chosenWeek, fetchSessions]);
    useEffect(() => {
        if (chosenWeek === notSet) {
            sessionStreamsData?.sessionStreams.forEach((sessionStream) => {
                setSessionsInfo((prev) =>
                    prev.set(sessionStream.id, {
                        location: sessionStream.location,
                        allocation: sessionStream.streamAllocations.map(
                            (allocation) => allocation.user.name
                        ),
                    })
                );
            });
        } else {
            sessionsData?.sessions.forEach((session) => {
                setSessionsInfo((prev) =>
                    prev.set(session.id, {
                        location: session.location,
                        allocation: session.sessionAllocations.map(
                            (allocation) => allocation.user.name
                        ),
                    })
                );
            });
        }
    }, [chosenWeek, sessionStreamsData, sessionsData]);
    return (
        <Loadable
            isLoading={
                chosenWeek === notSet
                    ? sessionStreamsData === undefined
                    : sessionsData === undefined
            }
        >
            <Timetable
                sessions={sessions}
                displayedDays={displayedDays}
                startTime={dayStartTime}
                endTime={dayEndTime}
                renderDay={(dayProps, key) => (
                    <Day
                        {...dayProps}
                        renderTimeSlot={(key) => <TimeSlot key={key} />}
                        renderSession={(
                            sessionProps,
                            key,
                            moreProps: TimetableSessionProps
                        ) => (
                            <TimetableSession
                                {...sessionProps}
                                key={key}
                                {...moreProps}
                            />
                        )}
                        getSessionProps={(sessionId) =>
                            sessionInfo.get(sessionId) || {
                                allocation: [],
                                location: "",
                            }
                        }
                        key={key}
                    />
                )}
            />
        </Loadable>
    );
};
