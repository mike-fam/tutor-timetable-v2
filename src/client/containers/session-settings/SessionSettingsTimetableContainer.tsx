import React, { useCallback, useContext, useMemo } from "react";
import { Loadable } from "../../components/helpers/Loadable";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { ClickableTimeslot } from "../../components/timetable/ClickableTimeslot";
import { SessionSettingsUtils } from "../../hooks/useSessionSettings";
import { defaultInt } from "../../constants";
import { SessionSettingsTimetableSession } from "../../components/session-settings/SessionSettingsTimetableSession";
import {
    SessionSettingsStyleProps,
    SessionSettingsTimetableStream,
} from "../../components/session-settings/SessionSettingsTimetableStream";
import { TimetableSessionType } from "../../types/timetable";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { SessionResponseType } from "../../types/session";
import {Map} from "immutable"

type Props = {
    loading: boolean;
    timetableState: SessionSettingsUtils["timetableState"];
    timetableActions: SessionSettingsUtils["actions"];
    selectActions: SessionSettingsUtils["selection"];
    week: number;
};

export const SessionSettingsTimetableContainer: React.FC<Props> = ({
    loading,
    timetableState,
    timetableActions,
    selectActions,
    week,
}) => {
    const { displayedDays } = useContext(TimetableSettingsContext);
    const { session, stream } = timetableState;
    const {
        streamsById,
        createdStreams,
        deletedStreams,
        modifiedStreams,
        deleteModifiedStreams,
    } = stream;
    const {
        deletedSessions,
        modifiedSessions,
        deleteModifiedSessions,
        sessionsByWeek,
    } = session;
    const {} = timetableActions;
    const {
        selectSessions,
        selectStreams,
        selectedSessions,
        selectedStreams,
        deselectSessions,
        deselectStreams,
    } = selectActions;
    const sessions = useMemo<TimetableSessionType[]>(() => {
        if (week === defaultInt) {
            return streamsById
                .entrySeq()
                .map(([streamId, stream]) => ({
                    id: streamId,
                    name: stream.name,
                    startTime: stream.startTime,
                    endTime: stream.endTime,
                    day: stream.day,
                }))
                .toArray();
        } else {
            return (sessionsByWeek.get(week) || Map<string, SessionResponseType>())
                .map((session, sessionId) => ({
                    id: sessionId,
                    name: session.sessionStream.name,
                    startTime: session.sessionStream.startTime,
                    endTime: session.sessionStream.endTime,
                    day: session.sessionStream.day,
                })).valueSeq()
                .toArray();
        }
    }, [week, sessionsByWeek, streamsById]);
    const streamStyle = useCallback<(streamId: string) => SessionSettingsStyleProps>(
        (streamId: string) => {
            if (deletedStreams.has(streamId)) {
                return {
                    opacity: 0.5,
                };
            }
            if (modifiedStreams.has(streamId)) {
                return {
                    color: "yellow.500",
                };
            }
            if (createdStreams.has(streamId)) {
                return {
                    bg: "green.500",
                };
            }
            return {};
        },
        [deletedStreams, modifiedStreams, createdStreams]
    );
    const sessionStyle = useCallback<(sessionId: string) => SessionSettingsStyleProps>(
        (sessionId: string) => {
            if (deletedSessions.has(sessionId)) {
                return {
                    opacity: 0.5,
                };
            }
            if (modifiedSessions.has(sessionId)) {
                return {
                    color: "yellow.500",
                };
            }
            return {};
        },
        [deletedSessions, modifiedSessions]
    );
    return (
        <Loadable isLoading={loading}>
            <Timetable
                sessions={sessions}
                displayedDays={displayedDays}
                renderDay={(dayProps, key) => (
                    <Day
                        {...dayProps}
                        key={key}
                        renderTimeSlot={(key, time, day) => (
                            week === defaultInt ?
                            <ClickableTimeslot
                                key={key}
                                addNewTimeslot={(timeslot) => {

                                }}
                                time={time}
                                day={day}
                            /> :
                                <TimeSlot key={key}/>
                        )}
                        renderSession={(sessionProps) =>
                            week === defaultInt ? (
                                <SessionSettingsTimetableStream
                                    {...sessionProps}
                                    key={sessionProps.sessionId}
                                    custom={(streamId) => {
                                        const stream =
                                            streamsById.get(streamId);
                                        return {
                                            courseCode:
                                                stream?.timetable.course.code ||
                                                "",
                                            baseAllocation: [
                                                stream?.weeks || [],
                                                stream?.allocatedUsers.map(
                                                    (user) => user.id
                                                ) || [],
                                            ],
                                            customAllocation:
                                                stream?.secondaryStreams.map(
                                                    (stream) => [
                                                        stream.weeks,
                                                        stream.allocatedUsers.map(
                                                            (user) => user.id
                                                        ),
                                                    ]
                                                ) || [],
                                            weekNames:
                                                stream?.timetable.term
                                                    .weekNames || [],
                                            location: stream?.location || "",
                                            styles: streamStyle(streamId),
                                        };
                                    }}
                                    onClick={(streamId) => {
                                        if (selectedStreams.has(streamId)) {
                                            deselectStreams(streamId);
                                        } else {
                                            selectStreams(streamId);
                                        }
                                    }}
                                />
                            ) : (
                                <SessionSettingsTimetableSession
                                    {...sessionProps}
                                    key={sessionProps.sessionId}
                                    custom={(sessionId) => {
                                        const session =
                                            sessionsByWeek.get(week)?.get(sessionId);
                                        return {
                                            allocation:
                                                session?.allocatedUsers.map(
                                                    (user) => user.id
                                                ) || [],
                                            location: session?.location || "",
                                            courseCode:
                                                session?.sessionStream.timetable
                                                    .course.code || "",
                                            styles: sessionStyle(sessionId),
                                        };
                                    }}
                                    onClick={(sessionId) => {
                                        if (selectedSessions.has(sessionId)) {
                                            deselectSessions(sessionId);
                                        } else {
                                            selectSessions(sessionId);
                                        }
                                    }}
                                />
                            )
                        }
                    />
                )}
            />
        </Loadable>
    );
};
