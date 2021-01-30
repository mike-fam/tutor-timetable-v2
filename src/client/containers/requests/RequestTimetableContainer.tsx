import React, { useCallback, useContext, useEffect, useState } from "react";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { Map, Set } from "immutable";
import {
    RequestSession,
    RequestSessionProps,
} from "../../components/requests/RequestSession";
import { SessionTheme, TimetableSessionType } from "../../types/timetable";
import { useLazyQueryWithError } from "../../hooks/useQueryWithError";
import {
    GetSessionsQuery,
    useGetSessionsLazyQuery,
} from "../../generated/graphql";
import { ArrayElement } from "../../types/helpers";
import { notSet } from "../../constants";
import { requestTimeslotHeight } from "../../types/requests";

type SessionResponseType = ArrayElement<GetSessionsQuery["sessions"]>;

type Props = {
    chosenCourse: number;
    chosenTerm: number;
    chosenWeek: number;
    checkDisabled: (session: SessionResponseType) => boolean;
    getTheme: (session: SessionResponseType) => SessionTheme;
    filterSessions: (
        sessions: GetSessionsQuery["sessions"]
    ) => GetSessionsQuery["sessions"];
};

export const RequestTimetableContainer: React.FC<Props> = ({
    chosenTerm,
    chosenCourse,
    chosenWeek,
    checkDisabled,
    getTheme,
    filterSessions,
}) => {
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    const [sessionInfo, setSessionInfo] = useState<
        Map<number, RequestSessionProps>
    >(Map());
    const [getSessions, { data: sessionData }] = useLazyQueryWithError(
        useGetSessionsLazyQuery
    );
    const [timetableSessions, setTimetableSessions] = useState<
        TimetableSessionType[]
    >([]);
    const [chosenSessions, setChosenSessions] = useState<Set<number>>(Set());
    const addSession = useCallback((sessionId) => {
        setChosenSessions((prev) => prev.add(sessionId));
    }, []);
    const unaddSession = useCallback((sessionId) => {
        setChosenSessions((prev) => prev.remove(sessionId));
    }, []);
    useEffect(() => {
        if (
            chosenTerm === notSet ||
            chosenCourse === notSet ||
            chosenWeek === notSet
        ) {
            return;
        }
        getSessions({
            variables: {
                courseIds: [chosenCourse],
                termId: chosenTerm,
                week: chosenWeek,
            },
        });
    }, [chosenTerm, chosenCourse, chosenWeek, getSessions]);
    useEffect(() => {
        if (!sessionData) {
            return;
        }
        const sessions = filterSessions(sessionData.sessions);
        sessions.forEach((session) => {
            setSessionInfo((prev) =>
                prev.set(session.id, {
                    onClick: chosenSessions.includes(session.id)
                        ? unaddSession
                        : addSession,
                    disabled: checkDisabled(session),
                    theme: getTheme(session),
                })
            );
        });
        setTimetableSessions(
            sessions.map((session) => ({
                id: session.id,
                name: session.sessionStream.name,
                startTime: session.sessionStream.startTime,
                endTime: session.sessionStream.endTime,
                day: session.sessionStream.day,
            }))
        );
    }, [
        sessionData,
        chosenSessions,
        addSession,
        unaddSession,
        checkDisabled,
        getTheme,
        filterSessions,
    ]);
    return (
        <Timetable
            displayedDays={displayedDays}
            sessions={timetableSessions}
            startTime={dayStartTime}
            endTime={dayEndTime}
            timeslotHeight={requestTimeslotHeight}
            renderDay={(dayProps, key) => (
                <Day
                    {...dayProps}
                    renderSession={(
                        sessionProps,
                        key,
                        moreProps: RequestSessionProps
                    ) => (
                        <RequestSession
                            {...sessionProps}
                            key={key}
                            {...moreProps}
                        />
                    )}
                    key={key}
                    renderTimeSlot={(key) => <TimeSlot key={key} />}
                    getSessionProps={(sessionId) =>
                        sessionInfo.get(sessionId) || {
                            onClick: () => {},
                            disabled: true,
                            theme: SessionTheme.PRIMARY,
                        }
                    }
                />
            )}
        />
    );
};
