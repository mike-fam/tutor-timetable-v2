import React, { useCallback, useContext, useMemo } from "react";
import { Loadable } from "../../components/helpers/Loadable";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { ClickableTimeslot } from "../../components/timetable/ClickableTimeslot";
import { defaultInt } from "../../constants";
import { SessionSettingsTimetableSession } from "../../components/session-settings/SessionSettingsTimetableSession";
import {
    SessionSettingsStyleProps,
    SessionSettingsTimetableStream,
    StreamSettingsCustomSessionProps,
} from "../../components/session-settings/SessionSettingsTimetableStream";
import { TimetableSessionType } from "../../types/timetable";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { SessionResponseType } from "../../types/session";
import { Map } from "immutable";
import { ModificationType, SessionType } from "../../generated/graphql";
import { useColorMode } from "@chakra-ui/react";
import { SessionSettingsUtils } from "../../types/session-settings";
import { UserMap } from "../../hooks/useUsersOfCourse";
import { v4 as uuid } from "uuid";

type Props = {
    loading: boolean;
    timetableState: SessionSettingsUtils["timetableState"];
    selectActions: SessionSettingsUtils["selection"];
    baseInfo: SessionSettingsUtils["base"];
    week: number;
    openStreamDrawer: () => void;
    users: UserMap;
};

export const SessionSettingsTimetableContainer: React.FC<Props> = ({
    loading,
    timetableState,
    selectActions,
    baseInfo,
    week,
    openStreamDrawer,
    users,
}) => {
    const { displayedDays } = useContext(TimetableSettingsContext);
    const { session, stream, streamActions } = timetableState;
    const { streamsById } = stream;
    const { sessionsByWeek } = session;
    const { course, term } = baseInfo;
    const {
        selectSessions,
        selectStreams,
        selectedSessions,
        selectedStreams,
        deselectSessions,
        deselectStreams,
        deselectAllStreams,
        selectExclusiveStream,
    } = selectActions;
    const { createStream, deleteStream, restoreStream } = streamActions;
    const { colorMode } = useColorMode();
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
            return (
                sessionsByWeek.get(week) || Map<string, SessionResponseType>()
            )
                .map((session, sessionId) => ({
                    id: sessionId,
                    name: session.sessionStream.name,
                    startTime: session.sessionStream.startTime,
                    endTime: session.sessionStream.endTime,
                    day: session.sessionStream.day,
                }))
                .valueSeq()
                .toArray();
        }
    }, [week, sessionsByWeek, streamsById]);
    const streamStyle = useCallback<
        (streamId: string) => SessionSettingsStyleProps
    >(
        (streamId: string) => {
            const stream = streamsById.get(streamId);
            if (!stream) {
                return { display: "none" };
            }
            let style = {};
            if (stream.settingsModification === ModificationType.Removed) {
                style = {
                    opacity: 0.5,
                };
            }
            if (stream.settingsModification === ModificationType.Modified) {
                style = {
                    color: "yellow.500",
                };
            }
            if (stream.settingsModification === ModificationType.Added) {
                style = {
                    color: "green.300",
                };
            }
            if (
                stream.settingsModification === ModificationType.RemovedModified
            ) {
                style = {
                    color: "yellow.500",
                    opacity: 0.5,
                };
            }
            if (selectedStreams.has(streamId)) {
                style = {
                    ...style,
                    bg: colorMode === "light" ? "blue.600" : "purple.700",
                };
            }
            return {
                ...style,
            };
        },
        [streamsById, colorMode, selectedStreams]
    );
    const streamCustomProps = useCallback(
        (streamId: string): StreamSettingsCustomSessionProps => {
            const stream = streamsById.get(streamId);
            const baseAllocation = [
                stream?.baseStaffRequirement.weeks || [],
                stream?.baseStaffRequirement.allocatedUsers.map(
                    (userId) => users.get(userId)?.name || ""
                ) || [],
                stream?.baseStaffRequirement.numberOfStaff || 0,
            ] as [number[], string[], number];
            const extraAllocations = (stream?.extraStaffRequirement.map(
                (requirement) => [
                    requirement.weeks,
                    requirement.allocatedUsers.map(
                        (userId) => users.get(userId)?.name || ""
                    ),
                    requirement.numberOfStaff,
                ]
            ) || []) as [number[], string[], number][];
            return {
                courseCode: course?.code || "",
                baseAllocation,
                extraAllocations,
                weekNames: term?.weekNames || [],
                location: stream?.location || "",
                styles: streamStyle(streamId),
                deleteStream: (streamId) => {
                    deleteStream(streamId);
                    deselectAllStreams();
                },
                editStream: (streamId) => {
                    selectExclusiveStream(streamId);
                    openStreamDrawer();
                },
                restoreStream,
                isDeleted:
                    !stream ||
                    stream.settingsModification === ModificationType.Removed ||
                    stream.settingsModification ===
                        ModificationType.RemovedModified,
            };
        },
        [
            course,
            term,
            streamsById,
            streamStyle,
            users,
            deleteStream,
            openStreamDrawer,
            restoreStream,
            selectExclusiveStream,
            deselectAllStreams,
        ]
    );
    const sessionStyle = useCallback<
        (sessionId: string) => SessionSettingsStyleProps
    >(
        (sessionId: string) => {
            const sessionWeeks = sessionsByWeek.get(week);
            if (!sessionWeeks) {
                return { display: "none" };
            }
            const session = sessionWeeks.get(sessionId);
            if (!session) {
                return { display: "none" };
            }
            if (session.settingsModification === ModificationType.Removed) {
                return {
                    opacity: 0.5,
                };
            }
            if (session.settingsModification === ModificationType.Modified) {
                return {
                    color: "yellow.500",
                };
            }
            return {};
        },
        [week, sessionsByWeek]
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
                        renderTimeSlot={(key, time, day) =>
                            week === defaultInt ? (
                                <ClickableTimeslot
                                    key={key}
                                    addNewTimeslot={(timeslot) => {
                                        const streamId = uuid();
                                        createStream(
                                            {
                                                name: "New Session Stream",
                                                type: SessionType.Practical,
                                                day: timeslot.day,
                                                startTime: timeslot.startTime,
                                                endTime: timeslot.endTime,
                                                location: "None",
                                                baseStaffRequirement: {
                                                    weeks: [],
                                                    numberOfStaff: 1,
                                                    allocatedUsers: [],
                                                },
                                                extraStaffRequirement: [],
                                            },
                                            streamId
                                        );
                                        selectExclusiveStream(streamId);
                                        openStreamDrawer();
                                    }}
                                    time={time}
                                    day={day}
                                />
                            ) : (
                                <TimeSlot key={key} />
                            )
                        }
                        renderSession={(sessionProps) =>
                            week === defaultInt ? (
                                <SessionSettingsTimetableStream
                                    {...sessionProps}
                                    key={sessionProps.sessionId}
                                    custom={streamCustomProps}
                                    onClick={(streamId) => {
                                        const stream =
                                            streamsById.get(streamId)!;

                                        if (
                                            stream.settingsModification ===
                                                ModificationType.Removed ||
                                            stream.settingsModification ===
                                                ModificationType.RemovedModified
                                        ) {
                                            return;
                                        }
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
                                        const session = sessionsByWeek
                                            .get(week)
                                            ?.get(sessionId);
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
                                            numberOfStaff:
                                                session?.numberOfStaff || 0,
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
