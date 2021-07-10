import React, { useContext, useEffect, useMemo, useState } from "react";
import { Timetable } from "../../components/timetable/Timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import {
    TimetableContext,
    TimetableSettingsContext,
} from "../../utils/timetable";
import { useQueryWithError } from "../../hooks/useApolloHooksWithError";
import { useGetRootSessionStreamsQuery } from "../../generated/graphql";
import { Loadable } from "../../components/helpers/Loadable";
import { IsoDay } from "../../../types/date";
import {
    TimetableSession,
    TimetableSessionProps,
} from "../../components/timetable/TimetableSession";
import { Map } from "immutable";
import { defaultInt, defaultStr } from "../../constants";
import { SessionsContext } from "../../hooks/useSessionUtils";
import { UserContext } from "../../utils/user";
import { SessionTheme } from "../../types/session";

type Props = {};

export const TimetableContainer: React.FC<Props> = () => {
    const [sessionInfo, setSessionsInfo] = useState<
        Map<string, TimetableSessionProps>
    >(Map<string, TimetableSessionProps>());
    const { displayedDays, dayStartTime, dayEndTime, displayMySessionsOnly } =
        useContext(TimetableSettingsContext);
    const { chosenTermId, chosenWeek, chosenCourses } =
        useContext(TimetableContext);
    const { user } = useContext(UserContext);
    // TODO: Use lazy query
    const { fetchSessions, sessionsData } = useContext(SessionsContext);
    const {
        data: sessionStreamsData,
        loading: sessionStreamsLoading,
    } = useQueryWithError(useGetRootSessionStreamsQuery, {
        variables: {
            termId: chosenTermId,
            courseIds: chosenCourses.toArray(),
        },
    });
    const sessions = useMemo(() => {
        if (chosenWeek === defaultInt) {
            if (sessionStreamsLoading || !sessionStreamsData) {
                return [];
            }
            return sessionStreamsData.rootSessionStreams
                .filter(
                    (stream) =>
                        stream.allocatedUsers.some(
                            (allocatedUser) =>
                                allocatedUser.username === user.username
                        ) || !displayMySessionsOnly
                )
                .map((sessionStream) => ({
                    id: sessionStream.id,
                    name: sessionStream.name,
                    startTime: sessionStream.startTime,
                    endTime: sessionStream.endTime,
                    day: sessionStream.day,
                }));
        } else {
            if (!sessionsData) {
                return [];
            }
            return sessionsData.mergedSessions
                .filter(
                    (session) =>
                        session.allocatedUsers.some(
                            (allocatedUser) =>
                                allocatedUser.username === user.username
                        ) || !displayMySessionsOnly
                )
                .map((session) => ({
                    id: session.id,
                    name: session.sessionStream.name,
                    startTime: session.sessionStream.startTime,
                    endTime: session.sessionStream.endTime,
                    day: session.sessionStream.day as IsoDay,
                }));
        }
    }, [
        chosenWeek,
        sessionsData,
        sessionStreamsData,
        sessionStreamsLoading,
        displayMySessionsOnly,
        user.username,
    ]);
    useEffect(() => {
        if (
            chosenTermId === defaultStr ||
            chosenCourses.size === 0 ||
            chosenWeek === defaultInt
        ) {
            return;
        }
        chosenCourses.forEach((courseId) => {
            fetchSessions(chosenTermId, courseId, chosenWeek);
        });
    }, [chosenTermId, chosenCourses, chosenWeek, fetchSessions]);
    useEffect(() => {
        if (chosenWeek === defaultInt) {
            sessionStreamsData?.rootSessionStreams.forEach((sessionStream) => {
                setSessionsInfo((prev) =>
                    prev.set(sessionStream.id, {
                        location: sessionStream.location,
                        allocation: sessionStream.allocatedUsers.map(
                            (allocatedUser) => allocatedUser.name
                        ),
                        theme:
                            sessionStream.allocatedUsers.length <
                            sessionStream.numberOfStaff
                                ? SessionTheme.WARNING
                                : SessionTheme.PRIMARY,
                    })
                );
            });
        } else {
            sessionsData?.mergedSessions.forEach((session) => {
                setSessionsInfo((prev) =>
                    prev.set(session.id, {
                        location: session.location,
                        allocation: session.allocatedUsers.map(
                            (allocatedUser) => allocatedUser.name
                        ),
                    })
                );
            });
        }
    }, [chosenWeek, sessionStreamsData, sessionsData]);
    return (
        <Loadable
            isLoading={
                chosenWeek === defaultInt
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
