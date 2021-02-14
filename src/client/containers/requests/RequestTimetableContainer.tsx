import React, { useContext, useEffect, useState } from "react";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { Map } from "immutable";
import {
    RequestSession,
    RequestSessionProps,
} from "../../components/requests/RequestSession";
import { TimetableSessionType } from "../../types/timetable";
import { useLazyQueryWithError } from "../../hooks/useQueryWithError";
import {
    GetSessionsQuery,
    useGetSessionsLazyQuery,
} from "../../generated/graphql";
import { notSet } from "../../constants";
import { requestTimeslotHeight } from "../../types/requests";
import { SessionResponseType, SessionTheme } from "../../types/session";

type Props = {
    chosenCourse: number;
    chosenTerm: number;
    chosenWeek: number;
    checkDisabled: (session: SessionResponseType) => boolean;
    getSessionTheme: (session: SessionResponseType) => SessionTheme;
    chooseSession: (sessionId: number) => void;
    filterSessions?: (
        sessions: GetSessionsQuery["sessions"]
    ) => GetSessionsQuery["sessions"];
};

export const RequestTimetableContainer: React.FC<Props> = ({
    chosenTerm,
    chosenCourse,
    chosenWeek,
    checkDisabled,
    getSessionTheme,
    chooseSession,
    filterSessions = (sessions) => sessions,
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
                    onClick: chooseSession,
                    disabled: checkDisabled(session),
                    theme: getSessionTheme(session),
                    location: session.location,
                    allocation: session.sessionAllocations.map(
                        (allocation) => allocation.user.name
                    ),
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
        checkDisabled,
        getSessionTheme,
        filterSessions,
        chooseSession,
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
                            onClick: chooseSession,
                            disabled: true,
                            theme: SessionTheme.PRIMARY,
                            location: "",
                            allocation: [],
                        }
                    }
                />
            )}
        />
    );
};
