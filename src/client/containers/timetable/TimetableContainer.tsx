import { FC, useContext, useEffect, useMemo, useState } from "react";
import { Timetable } from "../../components/timetable/Timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import {
    TimetableContext,
    TimetableSettingsContext,
} from "../../utils/timetable";
import { useLazyQueryWithError } from "../../hooks/useApolloHooksWithError";
import { useGetRootSessionStreamsLazyQuery } from "../../generated/graphql";
import { Loadable } from "../../components/helpers/Loadable";
import { IsoDay } from "../../../types/date";
import {
    TimetableCustomSessionProps,
    TimetableSession2,
} from "../../components/timetable/TimetableSession2";
import { Map } from "immutable";
import { defaultInt, defaultStr } from "../../constants";
import { SessionsContext } from "../../hooks/useSessionUtils";
import { UserContext } from "../../utils/user";
import { SessionTheme } from "../../types/session";
import {
    StreamCustomSessionProps,
    TimetableStreamSession,
} from "../../components/timetable/TimetableStreamSession";
import { Box, Text } from "@chakra-ui/react";
import { useTermMetadata } from "../../hooks/useTermMetadata";
import { addWeeks } from "date-fns";
import format from "date-fns/format";
import setDay from "date-fns/setDay";
import isToday from "date-fns/isToday";

type Props = {};

export const TimetableContainer: FC<Props> = () => {
    const [sessionInfo, setSessionsInfo] = useState<
        Map<string, TimetableCustomSessionProps>
    >(Map<string, TimetableCustomSessionProps>());
    const [streamInfo, setStreamInfo] = useState<
        Map<string, StreamCustomSessionProps>
    >(Map<string, StreamCustomSessionProps>());
    const { displayedDays, dayStartTime, dayEndTime, displayMySessionsOnly } =
        useContext(TimetableSettingsContext);
    const { chosenTermId, chosenWeek, chosenCourses } =
        useContext(TimetableContext);
    const { chosenTerm } = useTermMetadata(chosenTermId);
    const { user } = useContext(UserContext);
    const { fetchSessions, sessionsData } = useContext(SessionsContext);
    const [
        getRootSessionStreams,
        { data: sessionStreamsData, loading: sessionStreamsLoading },
    ] = useLazyQueryWithError(useGetRootSessionStreamsLazyQuery, {
        fetchPolicy: "cache-and-network",
    });
    useEffect(() => {
        if (
            chosenWeek !== defaultInt ||
            chosenCourses.size === 0 ||
            chosenTermId === defaultStr
        ) {
            return;
        }
        getRootSessionStreams({
            variables: {
                termId: chosenTermId,
                courseIds: chosenCourses.toArray(),
            },
        });
    }, [chosenWeek, getRootSessionStreams, chosenCourses, chosenTermId]);
    const sessions = useMemo(() => {
        if (chosenWeek === defaultInt) {
            if (sessionStreamsLoading || !sessionStreamsData) {
                return [];
            }
            return sessionStreamsData.rootSessionStreams
                .filter((stream) => {
                    if (!chosenCourses.contains(stream.timetable.course.id)) {
                        return false;
                    }
                    if (!displayMySessionsOnly) {
                        return true;
                    }
                    const allAllocatedUsers = stream.allocatedUsers.map(
                        (user) => user.username
                    );
                    for (const secondaryStream of stream.secondaryStreams) {
                        allAllocatedUsers.push(
                            ...secondaryStream.allocatedUsers.map(
                                (user) => user.username
                            )
                        );
                    }
                    return allAllocatedUsers.includes(user.username);
                })
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
                .filter((session) => {
                    if (
                        !chosenCourses.contains(
                            session.sessionStream.timetable.course.id
                        )
                    ) {
                        return false;
                    }
                    return (
                        session.allocatedUsers.some(
                            (allocatedUser) =>
                                allocatedUser.username === user.username
                        ) || !displayMySessionsOnly
                    );
                })
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
        chosenCourses,
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
        fetchSessions(chosenTermId, chosenCourses.toArray(), chosenWeek);
    }, [chosenTermId, chosenCourses, chosenWeek, fetchSessions]);
    useEffect(() => {
        sessionStreamsData?.rootSessionStreams.forEach((sessionStream) => {
            setStreamInfo((prev) =>
                prev.set(sessionStream.id, {
                    location: sessionStream.location,
                    baseAllocation: [
                        sessionStream.weeks,
                        sessionStream.allocatedUsers.map(
                            (allocatedUser) => allocatedUser.name
                        ),
                        sessionStream.numberOfStaff,
                    ],
                    customAllocation: sessionStream.secondaryStreams.map(
                        (stream) => [
                            stream.weeks,
                            stream.allocatedUsers.map((user) => user.name),
                            stream.numberOfStaff,
                        ]
                    ),
                    weekNames: sessionStream.timetable.term.weekNames,
                    theme:
                        sessionStream.allocatedUsers.length <
                        sessionStream.numberOfStaff
                            ? SessionTheme.WARNING
                            : SessionTheme.PRIMARY,
                    courseCode: sessionStream.timetable.course.code,
                })
            );
        });
    }, [sessionStreamsData]);
    useEffect(() => {
        sessionsData?.mergedSessions.forEach((session) => {
            setSessionsInfo((prev) =>
                prev.set(session.id, {
                    location: session.location,
                    allocation: session.allocatedUsers.map(
                        (allocatedUser) => allocatedUser.name
                    ),
                    courseCode: session.sessionStream.timetable.course.code,
                    numberOfStaff: session.numberOfStaff,
                })
            );
        });
    }, [sessionsData]);
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
                renderDay={(dayProps, key) => {
                    const date =
                        chosenTerm &&
                        setDay(
                            addWeeks(chosenTerm.startDate, chosenWeek),
                            dayProps.day
                        );
                    return (
                        <Box key={key}>
                            {date && chosenWeek !== defaultInt && (
                                <Text
                                    fontWeight={
                                        isToday(date) ? "bold" : "regular"
                                    }
                                >
                                    {format(date, "dd/MM")}
                                    {isToday(date) && " (Today)"}
                                </Text>
                            )}
                            <Day
                                {...dayProps}
                                renderTimeSlot={(key) => <TimeSlot key={key} />}
                                renderSession={(sessionProps, key) =>
                                    chosenWeek === defaultInt ? (
                                        <TimetableStreamSession
                                            {...sessionProps}
                                            key={key}
                                            custom={(streamId) =>
                                                streamInfo.get(streamId) || {
                                                    baseAllocation: [[], [], 0],
                                                    customAllocation: [],
                                                    location: "",
                                                    courseCode: "",
                                                    weekNames: [],
                                                }
                                            }
                                        />
                                    ) : (
                                        <TimetableSession2
                                            {...sessionProps}
                                            key={key}
                                            custom={(sessionId) =>
                                                sessionInfo.get(sessionId) || {
                                                    allocation: [],
                                                    location: "",
                                                    courseCode: "",
                                                    numberOfStaff: 0,
                                                }
                                            }
                                        />
                                    )
                                }
                                key={key}
                            />
                        </Box>
                    );
                }}
            />
        </Loadable>
    );
};
