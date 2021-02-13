import React, { useContext, useEffect, useState } from "react";
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
import { notSet } from "../../constants";
import { SessionResponseType } from "../../types/session";
import { requestTimeslotHeight } from "../../constants/requests";
import { IsoDay } from "../../../types/date";

type Props = {
    chosenCourses: number[];
    chosenTerm: number;
    chosenWeek: number;
    checkDisabled: (session: SessionResponseType) => boolean;
    getSessionTheme: (session: SessionResponseType) => SessionTheme;
    chooseSession: (sessionId: number) => void;
    filterSessions?: (
        sessions: GetSessionsQuery["sessions"]
    ) => GetSessionsQuery["sessions"];
    displayedDays?: IsoDay[];
};

export const RequestTimetableContainer: React.FC<Props> = ({
    chosenTerm,
    chosenCourses,
    chosenWeek,
    checkDisabled,
    getSessionTheme,
    chooseSession,
    filterSessions = (sessions) => sessions,
    displayedDays: displayedDayProps,
}) => {
    const {
        displayedDays: displayedDaysContext,
        dayStartTime,
        dayEndTime,
    } = useContext(TimetableSettingsContext);
    const displayedDays = displayedDayProps
        ? Set(displayedDayProps)
        : displayedDaysContext;
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
            chosenCourses.length === 0 ||
            chosenWeek === notSet
        ) {
            return;
        }
        getSessions({
            variables: {
                courseIds: chosenCourses,
                termId: chosenTerm,
                week: chosenWeek,
            },
        });
    }, [chosenTerm, chosenCourses, chosenWeek, getSessions]);
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
