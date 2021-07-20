import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultInt, defaultStr } from "../constants";
import {
    ModificationType,
    SessionType,
    StreamInput,
    StreamStaffRequirement,
    useAddMergedSessionStreamsMutation,
    useDeleteSessionsMutation,
    useDeleteSessionStreamsMutation,
    useGetMergedSessionsLazyQuery,
    useGetRootSessionStreamsLazyQuery,
    useStreamsFromPublicTimetableLazyQuery,
    useUpdateSessionAllocationMutation,
    useUpdateSessionMutation,
    useUpdateSessionStreamsMutation,
} from "../generated/graphql";
import {
    useLazyQueryWithError,
    useMutationWithError,
} from "./useApolloHooksWithError";
import { useTermCourse } from "./useTermCourse";
import { useMultiSelection } from "./useMultiSelection";
import { List, Map } from "immutable";
import { SessionResponseType } from "../types/session";
import { StreamResponseType } from "../types/session-stream";
import { v4 as uuid } from "uuid";
import {
    SessionFields,
    SessionResponseWithModification,
    StreamInputWithModification,
} from "../types/session-settings";
import isEqual from "lodash/isEqual";
import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";

const streamResponseToState = (stream: StreamResponseType): StreamInput => {
    return {
        day: stream.day,
        startTime: stream.startTime,
        endTime: stream.endTime,
        location: stream.location,
        name: stream.name,
        type: stream.type,
        baseStaffRequirement: {
            weeks: stream.weeks,
            numberOfStaff: stream.numberOfStaff,
            allocatedUsers: stream.allocatedUsers.map((user) => user.id),
        },
        extraStaffRequirement: stream.secondaryStreams.map((stream) => ({
            weeks: stream.weeks,
            numberOfStaff: stream.numberOfStaff,
            allocatedUsers: stream.allocatedUsers.map((user) => user.id),
        })),
    };
};

export const useSessionSettings = () => {
    const { courseId, termId, changeCourse, changeTerm, course, term } =
        useTermCourse();
    const [week, chooseWeek] = useState(defaultInt);
    const [sessionsByWeek, setSessionsByWeek] = useState(
        Map<number, Map<string, SessionResponseWithModification>>()
    );
    const [sessionsToWeek, setSessionToWeek] = useState(Map<string, number>());
    const [streamsById, setStreams] = useState(
        Map<string, StreamInputWithModification>()
    );
    const {
        selected: selectedStreams,
        select: selectStreams,
        deselect: deselectStreams,
        deselectAll: deselectAllStreams,
        selectExclusive: selectExclusiveStream,
    } = useMultiSelection<string>();
    const {
        selected: selectedSessions,
        select: selectSessions,
        deselect: deselectSessions,
        deselectAll: deselectAllSessions,
        selectExclusive: selectExclusiveSession,
    } = useMultiSelection<string>();

    // Handle fetching streams
    const [fetchStreams, { data: getStreamData, loading: streamsLoading }] =
        useLazyQueryWithError(useGetRootSessionStreamsLazyQuery, {
            fetchPolicy: "cache-and-network",
        });
    const [fetchSessions, { data: getSessionsData, loading: sessionsLoading }] =
        useLazyQueryWithError(useGetMergedSessionsLazyQuery, {
            fetchPolicy: "cache-and-network",
        });

    const selectedStreamInput = useMemo<Partial<StreamInput>>(() => {
        if (selectedStreams.size === 1) {
            const selectedStreamId = List(selectedStreams).get(0)!;
            return streamsById.get(selectedStreamId)!;
        } else if (selectedStreams.size > 1) {
            const selectedStreamObjs: StreamInput[] = [];
            for (const selectedStreamId of selectedStreams) {
                selectedStreamObjs.push(streamsById.get(selectedStreamId)!);
            }
            let location: string | undefined = undefined;
            let baseStaffRequirement: StreamStaffRequirement | undefined =
                undefined;
            let extraStaffRequirement: StreamStaffRequirement[] | undefined =
                undefined;
            let propertiesDefined = false;
            for (const selectedStream of selectedStreamObjs) {
                if (!propertiesDefined) {
                    location = selectedStream.location;
                    baseStaffRequirement = selectedStream.baseStaffRequirement;
                    extraStaffRequirement =
                        selectedStream.extraStaffRequirement;
                    propertiesDefined = true;
                    continue;
                }
                if (location && selectedStream.location !== location) {
                    location = undefined;
                }
                if (
                    baseStaffRequirement &&
                    !isEqual(
                        baseStaffRequirement,
                        selectedStream.baseStaffRequirement
                    )
                ) {
                    baseStaffRequirement = undefined;
                }
                if (
                    extraStaffRequirement &&
                    !isEqual(
                        extraStaffRequirement,
                        selectedStream.extraStaffRequirement
                    )
                ) {
                    extraStaffRequirement = undefined;
                }
                if (
                    !location &&
                    !baseStaffRequirement &&
                    !extraStaffRequirement
                ) {
                    break;
                }
            }
            return {
                location,
                baseStaffRequirement,
                extraStaffRequirement,
            };
        } else {
            return {};
        }
    }, [selectedStreams, streamsById]);

    const commitNewStreams = useCallback((streams: StreamResponseType[]) => {
        streams.forEach((stream) => {
            setStreams((prev) =>
                prev.set(stream.id, {
                    ...streamResponseToState(stream),
                    settingsModification: ModificationType.Unchanged,
                })
            );
        });
    }, []);

    const commitNewSessions = useCallback((sessions: SessionResponseType[]) => {
        sessions.forEach((session) => {
            setSessionsByWeek((prev) =>
                prev.set(
                    session.week,
                    (
                        prev.get(session.week) ||
                        Map<string, SessionResponseWithModification>()
                    ).set(session.id, {
                        ...session,
                        settingsModification: ModificationType.Unchanged,
                        allocationModification: ModificationType.Unchanged,
                    })
                )
            );
            setSessionToWeek((prev) => prev.set(session.id, session.week));
        });
    }, []);

    // Fetch one first time
    useEffect(() => {
        if (!courseId || !termId || week !== defaultInt) {
            return;
        }
        fetchStreams({ variables: { courseIds: [courseId], termId } });
    }, [courseId, termId, fetchStreams, week, getStreamData]);

    useEffect(() => {
        if (
            !courseId ||
            !termId ||
            week === defaultInt ||
            sessionsByWeek.has(week)
        ) {
            return;
        }
        fetchSessions({ variables: { courseIds: [courseId], termId, week } });
    }, [courseId, termId, week, fetchSessions, sessionsByWeek]);

    // Always update streams after fetching
    useEffect(() => {
        if (!getStreamData) {
            return;
        }
        commitNewStreams(getStreamData.rootSessionStreams);
    }, [getStreamData, courseId, termId, commitNewStreams]);
    // Update sessions as well
    useEffect(() => {
        if (!getSessionsData) {
            return;
        }
        commitNewSessions(getSessionsData.mergedSessions);
    }, [getSessionsData, commitNewSessions]);

    // Handle editing streams
    const editMultipleStreamSettings = useCallback(
        (newStreamInput: Partial<StreamInput>) => {
            selectedStreams.forEach((streamId) =>
                setStreams((prev) => {
                    const stream = prev.get(streamId);
                    if (!stream) {
                        return prev;
                    }
                    const { location, ...sanitisedInput } = omitBy(
                        newStreamInput,
                        isUndefined
                    );
                    if (
                        stream.settingsModification ===
                        ModificationType.Unchanged
                    ) {
                        return prev.set(streamId, {
                            ...stream,
                            ...sanitisedInput,
                            location: (location as string) || stream.location,
                            settingsModification: ModificationType.Modified,
                        });
                    } else if (
                        stream.settingsModification ===
                            ModificationType.Added ||
                        stream.settingsModification ===
                            ModificationType.Modified
                    ) {
                        return prev.set(streamId, {
                            ...stream,
                            ...sanitisedInput,
                            location: (location as string) || stream.location,
                        });
                    }
                    return prev;
                })
            );
        },
        [selectedStreams]
    );

    const createStream = useCallback((stream: StreamInput, id?: string) => {
        setStreams((prev) =>
            prev.set(id || uuid(), {
                ...stream,
                settingsModification: ModificationType.Added,
            })
        );
    }, []);

    const deleteStream = useCallback((streamId) => {
        setStreams((prev) => {
            if (!prev.has(streamId)) {
                return prev;
            }
            const stream = prev.get(streamId)!;
            if (stream.settingsModification === ModificationType.Added) {
                return prev.remove(streamId);
            } else if (
                stream.settingsModification === ModificationType.Modified
            ) {
                return prev.set(streamId, {
                    ...stream,
                    settingsModification: ModificationType.RemovedModified,
                });
            } else if (
                stream.settingsModification === ModificationType.Unchanged
            ) {
                return prev.set(streamId, {
                    ...stream,
                    settingsModification: ModificationType.Removed,
                });
            }
            return prev;
        });
    }, []);

    const deleteSelectedStreams = useCallback(() => {
        selectedStreams.forEach((streamId) => {
            deleteStream(streamId);
        });
    }, [selectedStreams, deleteStream]);

    // Handle fetching from public timetable
    const [
        fetchFromPublicTimetable,
        { data: publicTimetableData, loading: publicTimetableLoading },
    ] = useLazyQueryWithError(useStreamsFromPublicTimetableLazyQuery, {});

    const restoreStream = useCallback((streamId) => {
        setStreams((prev) => {
            if (!prev.has(streamId)) {
                return prev;
            }
            const stream = prev.get(streamId)!;
            if (stream.settingsModification === ModificationType.Removed) {
                return prev.set(streamId, {
                    ...stream,
                    settingsModification: ModificationType.Unchanged,
                });
            } else if (
                stream.settingsModification === ModificationType.RemovedModified
            ) {
                return prev.set(streamId, {
                    ...stream,
                    settingsModification: ModificationType.Modified,
                });
            }
            return prev;
        });
    }, []);
    const getStreamsFromPublicTimetable = useCallback(
        (sessionTypes: SessionType[]) => {
            if (courseId === defaultStr || termId === defaultStr) {
                return;
            }
            fetchFromPublicTimetable({
                variables: {
                    courseTerm: {
                        courseId,
                        termId,
                    },
                    sessionTypes,
                },
            });
        },
        [courseId, termId, fetchFromPublicTimetable]
    );

    useEffect(() => {
        if (!publicTimetableData) {
            return;
        }
        publicTimetableData.fromPublicTimetable.forEach((stream) => {
            createStream(streamResponseToState(stream));
        });
    }, [publicTimetableData, createStream]);

    // Handle editing sessions
    const editMultipleSessions = useCallback(
        (updatedFields: SessionFields) => {
            selectedSessions.forEach((sessionId) => {
                setSessionsByWeek((prev) => {
                    const week = sessionsToWeek.get(sessionId);
                    if (!week) {
                        return prev;
                    }
                    const weekSessions = sessionsByWeek.get(week);
                    if (!weekSessions) {
                        return prev;
                    }
                    const session = weekSessions.get(sessionId);
                    if (!session) {
                        return prev;
                    }
                    return prev.set(
                        week,
                        weekSessions.set(sessionId, {
                            ...session,
                            ...updatedFields,
                            settingsModification: ModificationType.Modified,
                        })
                    );
                });
            });
        },
        [selectedSessions, sessionsToWeek, sessionsByWeek]
    );

    // Handle submitting changes
    const [
        submitUpdatedStream,
        { data: updatedStreamsData, loading: updatedStreamsLoading },
    ] = useMutationWithError(useUpdateSessionStreamsMutation, {
        errorPolicy: "all",
    });
    const [
        submitMergedStreams,
        { data: addMergedStreamsData, loading: addMergedStreamsLoading },
    ] = useMutationWithError(useAddMergedSessionStreamsMutation, {
        errorPolicy: "all",
    });
    const [
        submitDeletedStreams,
        { data: deletedStreamsData, loading: deletedStreamsLoading },
    ] = useMutationWithError(useDeleteSessionStreamsMutation, {
        errorPolicy: "all",
    });

    const [
        submitUpdatedSessions,
        { data: updatedSessionsData, loading: updatedSessionsLoading },
    ] = useMutationWithError(useUpdateSessionMutation, { errorPolicy: "all" });
    const [
        submitDeletedSessions,
        { data: deletedSessionsData, loading: deletedSessionsLoading },
    ] = useMutationWithError(useDeleteSessionsMutation, { errorPolicy: "all" });
    const [
        submitSessionAllocations,
        {
            data: updatedSessionAllocationsData,
            loading: updatedSessionsAllocationLoading,
        },
    ] = useMutationWithError(useUpdateSessionAllocationMutation, {});

    const submitChanges = useCallback(() => {
        const createdStreams: StreamInput[] = [];
        const modifiedStreams: [string, StreamInput][] = [];
        const deletedStreamIds: string[] = [];
        for (const [streamId, stream] of streamsById) {
            if (stream.settingsModification === ModificationType.Added) {
                createdStreams.push(stream);
            } else if (
                stream.settingsModification === ModificationType.Modified
            ) {
                modifiedStreams.push([streamId, stream]);
            } else if (
                stream.settingsModification === ModificationType.Removed ||
                stream.settingsModification === ModificationType.RemovedModified
            ) {
                deletedStreamIds.push(streamId);
            }
        }
        if (createdStreams.length > 0) {
            submitMergedStreams({
                variables: {
                    sessionStreams: createdStreams.map((StreamInput) => ({
                        name: StreamInput.name,
                        type: StreamInput.type,
                        startTime: StreamInput.startTime,
                        endTime: StreamInput.endTime,
                        day: StreamInput.day,
                        location: StreamInput.location,
                        baseStaffRequirement: StreamInput.baseStaffRequirement,
                        extraStaffRequirement:
                            StreamInput.extraStaffRequirement,
                        courseId,
                        termId,
                    })),
                },
            });
        }
        if (modifiedStreams.length > 0) {
            submitUpdatedStream({
                variables: {
                    updateStreamInput: modifiedStreams.map(
                        ([streamId, StreamInput]) => ({
                            name: StreamInput.name,
                            type: StreamInput.type,
                            startTime: StreamInput.startTime,
                            endTime: StreamInput.endTime,
                            day: StreamInput.day,
                            location: StreamInput.location,
                            baseStaffRequirement:
                                StreamInput.baseStaffRequirement,
                            extraStaffRequirement:
                                StreamInput.extraStaffRequirement,
                            streamId,
                        })
                    ),
                },
            });
        }
        if (deletedStreamIds.length > 0) {
            submitDeletedStreams({
                variables: {
                    streamIds: deletedStreamIds,
                },
            });
        }
        const modifiedSessions: SessionResponseType[] = [];
        const deletedSessionIds: string[] = [];
        const allocationModifiedSessions: SessionResponseType[] = [];
        for (const sessionEntry of sessionsByWeek) {
            const weekSessions = sessionEntry[1];
            for (const [sessionId, session] of weekSessions) {
                if (
                    session.settingsModification === ModificationType.Modified
                ) {
                    modifiedSessions.push(session);
                } else if (
                    session.settingsModification ===
                        ModificationType.RemovedModified ||
                    session.settingsModification === ModificationType.Removed
                ) {
                    deletedSessionIds.push(sessionId);
                }
                if (
                    session.allocationModification === ModificationType.Modified
                ) {
                    allocationModifiedSessions.push(session);
                }
            }
        }
        if (modifiedSessions.length > 0) {
            submitUpdatedSessions({
                variables: {
                    updateSessionInput: modifiedSessions.map((session) => ({
                        id: session.id,
                        location: session.location,
                    })),
                },
            });
        }
        if (deletedSessionIds.length > 0) {
            submitDeletedSessions({
                variables: {
                    sessionIds: deletedSessionIds,
                },
            });
        }
        if (allocationModifiedSessions.length > 0) {
            submitSessionAllocations({
                variables: {
                    newAllocation: allocationModifiedSessions.map(
                        (session) => ({
                            rootSessionId: session.id,
                            newAllocation: session.allocatedUsers.map(
                                (user) => user.id
                            ),
                        })
                    ),
                },
            });
        }
        deselectAllStreams();
    }, [
        courseId,
        termId,
        submitMergedStreams,
        submitDeletedSessions,
        submitDeletedStreams,
        submitSessionAllocations,
        submitUpdatedSessions,
        submitUpdatedStream,
        sessionsByWeek,
        streamsById,
        deselectAllStreams,
    ]);

    useEffect(() => {
        if (!updatedStreamsData) {
            return;
        }
        commitNewStreams(updatedStreamsData.updateSessionStreams);
    }, [updatedStreamsData, commitNewStreams]);

    useEffect(() => {
        if (!addMergedStreamsData) {
            return;
        }
        commitNewStreams(addMergedStreamsData.addMergedSessionStreams);
        setStreams((prev) =>
            prev.filter(
                (stream) =>
                    stream.settingsModification !== ModificationType.Added
            )
        );
    }, [addMergedStreamsData, commitNewStreams]);

    useEffect(() => {
        if (!deletedStreamsData) {
            return;
        }
        deletedStreamsData.deleteSessionStreams.forEach((streamId) => {
            setStreams((prev) => prev.remove(streamId));
        });
    }, [deletedStreamsData]);

    useEffect(() => {
        if (!updatedSessionsData) {
            return;
        }
        commitNewSessions(updatedSessionsData.updateSession);
    }, [updatedSessionsData, commitNewSessions]);

    useEffect(() => {
        if (!deletedSessionsData) {
            return;
        }
        deletedSessionsData.deleteSessions.forEach((sessionId) => {
            for (const [week] of sessionsByWeek) {
                setSessionsByWeek((prev) =>
                    prev.set(week, prev.get(week)!.delete(sessionId))
                );
                setSessionToWeek((prev) => prev.delete(sessionId));
            }
        });
    }, [deletedSessionsData, sessionsByWeek]);

    useEffect(() => {
        if (!updatedSessionAllocationsData) {
            return;
        }
        commitNewSessions(
            updatedSessionAllocationsData.updateSessionAllocations
        );
    }, [updatedSessionAllocationsData, commitNewSessions]);

    // TODO: Implement week cache
    return {
        selection: {
            selectedStreams,
            selectStreams,
            deselectStreams,
            deselectAllStreams,
            selectedSessions,
            selectSessions,
            deselectSessions,
            deselectAllSessions,
            selectedStreamInput,
            selectExclusiveStream,
            selectExclusiveSession,
        },
        timetableState: {
            stream: {
                streamsById,
            },
            streamActions: {
                createStream,
                deleteStream,
                restoreStream,
                deleteSelectedStreams,
                editMultipleStreamSettings,
            },
            session: {
                sessionsByWeek,
            },
            sessionActions: {
                editMultipleSessions,
            },
            streamAllocation: {},
            streamAllocationActions: {},
            sessionAllocation: {},
            sessionAllocationActions: {},
        },
        actions: {
            getStreamsFromPublicTimetable,
            submitChanges,
        },
        base: {
            courseId,
            termId,
            changeCourse,
            changeTerm,
            week,
            chooseWeek,
            course,
            term,
        },
        loading:
            streamsLoading ||
            sessionsLoading ||
            updatedStreamsLoading ||
            addMergedStreamsLoading ||
            deletedStreamsLoading ||
            publicTimetableLoading ||
            updatedSessionsLoading ||
            updatedSessionsAllocationLoading ||
            deletedSessionsLoading,
    };
};
