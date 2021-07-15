// TODO: What this can do
//  Allow fetching from public timetable
//    if there's already data for that semester and course, add more sessions
//  Allow fetching from server
//  Allow selecting multiple sessions streams and edit/delete those streams
//  (Should store modification state of stream and color code)
//  Allow user to switch between session stream and sessions view

// TODO: Implementation
//  Store selected sessions
//  Store all sessions and their states
//  Store previous states for undo
// TODO: This should store:
//  States: Unchanged, updated, deleted, created, remove_modified sessions
import { useCallback, useEffect, useState } from "react";
import { defaultInt, defaultStr } from "../constants";
import {
    ChangeStreamAllocationInput,
    GetRootSessionStreamsQuery,
    MergedStreamInput,
    SessionType,
    StreamInput,
    UpdateSessionAllocationInput,
    UpdateSessionInput,
    useAddMergedSessionStreamsMutation,
    useDeleteSessionsMutation,
    useDeleteSessionStreamsMutation,
    useGetMergedSessionsLazyQuery,
    useGetRootSessionStreamsLazyQuery,
    useStreamsFromPublicTimetableLazyQuery,
    useUpdateSessionAllocationMutation,
    useUpdateSessionMutation,
    useUpdateSessionStreamsMutation,
    useUpdateStreamAllocationsMutation,
} from "../generated/graphql";
import {
    useLazyQueryWithError,
    useMutationWithError,
} from "./useApolloHooksWithError";
import { useTermCourse } from "./useTermCourse";
import { useModificationMap } from "./useModificationMap";
import { useMultiSelection } from "./useMultiSelection";
import {
    getStreamAllocationPattern,
    getStreamWeekPattern,
} from "../utils/session-stream";
import { ArrayElement } from "../types/helpers";

type SessionFields = Omit<UpdateSessionInput, "id">;
type StreamAllocationFields = Omit<ChangeStreamAllocationInput, "streamId">;
type SessionAllocationFields = Omit<
    UpdateSessionAllocationInput,
    "rootSessionId"
>;

export type SessionSettingsUtils = ReturnType<typeof useSessionSettings>;

export const useSessionSettings = () => {
    const { courseId, termId, changeCourse, changeTerm, course, term } =
        useTermCourse();
    const [week, chooseWeek] = useState(defaultInt);
    const {
        selected: selectedStreams,
        select: selectStreams,
        deselect: deselectStreams,
        deselectAll: deselectAllStreams,
    } = useMultiSelection<string>();
    const {
        selected: selectedSessions,
        select: selectSessions,
        deselect: deselectSessions,
        deselectAll: deselectAllSessions,
    } = useMultiSelection<string>();
    const {
        unchanged: unchangedStreams,
        created: createdStreams,
        deleted: deletedStreams,
        modified: modifiedStreams,
        deleteModified: deleteModifiedStreams,
        createItem: createStream,
        deleteItem: deleteStream,
        commitItem: commitStream,
        commitRemoveItem: commitRemoveStream,
        permDeleteItems: permDeleteStreams,
        clearItems: clearStreams,
        resetItems: resetStreams,
        restoreItem: restoreStreams,
        updateItem: updateStreams,
    } = useModificationMap<StreamInput>();
    const {
        unchanged: unchangedSessions,
        created: createdSessions,
        deleted: deletedSessions,
        modified: modifiedSessions,
        deleteModified: deleteModifiedSessions,
        commitItem: commitSession,
        commitRemoveItem: commitRemoveSession,
        createItem: createSession,
        deleteItem: deleteSession,
        permDeleteItems: permDeleteSessions,
        clearItems: clearSessions,
        resetItems: resetSessions,
        restoreItem: restoreSessions,
        updateItem: updateSessions,
    } = useModificationMap<SessionFields>();
    const {
        unchanged: unchangedStreamAllocations,
        modified: modifiedStreamAllocations,
        updateItem: updateStreamAllocations,
        resetItems: resetStreamAllocations,
        commitItem: commitStreamAllocations,
        commitRemoveItem: commitRemoveStreamAllocation,
    } = useModificationMap<StreamAllocationFields>();
    const {
        unchanged: unchangedSessionAllocations,
        modified: modifiedSessionAllocations,
        updateItem: updateSessionAllocations,
        resetItems: resetSessionAllocation,
        commitItem: commitSessionAllocations,
        commitRemoveItem: commitRemoveSessionAllocation,
    } = useModificationMap<SessionAllocationFields>();

    const streamToInput = useCallback(
        (
            stream: ArrayElement<
                GetRootSessionStreamsQuery["rootSessionStreams"]
            >
        ): StreamInput => ({
            name: stream.name,
            type: stream.type,
            day: stream.day,
            startTime: stream.startTime,
            endTime: stream.endTime,
            location: stream.location,
            numberOfTutorsForWeeks: getStreamWeekPattern(stream),
        }),
        []
    );

    // Handle fetching streams
    const [
        fetchStreams,
        { data: getSessionStreamsData, loading: streamsLoading },
    ] = useLazyQueryWithError(useGetRootSessionStreamsLazyQuery, {
        fetchPolicy: "cache-and-network",
    });
    const [fetchSessions, { data: getSessionsData, loading: sessionsLoading }] =
        useLazyQueryWithError(useGetMergedSessionsLazyQuery, {
            fetchPolicy: "cache-and-network",
        });
    // Fetch one first time
    useEffect(() => {
        if (!courseId || !termId || week !== defaultInt) {
            return;
        }
        fetchStreams({ variables: { courseIds: [courseId], termId } });
    }, [courseId, termId, fetchStreams, week]);

    useEffect(() => {
        if (!courseId || !termId || week === defaultInt) {
            return;
        }
        fetchSessions({ variables: { courseIds: [courseId], termId, week } });
    }, [courseId, termId, week, fetchSessions]);

    // Always update streams after fetching
    useEffect(() => {
        if (!getSessionStreamsData) {
            return;
        }
        resetStreams(
            getSessionStreamsData.rootSessionStreams.map((stream) => [
                stream.id,
                streamToInput(stream),
            ])
        );
        resetStreamAllocations(
            getSessionStreamsData.rootSessionStreams.map((stream) => [
                stream.id,
                { allocation: getStreamAllocationPattern(stream) },
            ])
        );
        // TODO: update allocated users here as well
    }, [
        getSessionStreamsData,
        courseId,
        termId,
        resetStreams,
        resetStreamAllocations,
        streamToInput,
    ]);
    // Update sessions as well
    useEffect(() => {
        if (!getSessionsData) {
            return;
        }
        getSessionsData.mergedSessions.forEach((session) => {
            commitSession(session.id, { location: session.location });
            commitSessionAllocations(session.id, {
                newAllocation: session.allocatedUsers.map((user) => user.id),
            });
        });
    }, [getSessionsData, commitSession, commitSessionAllocations]);

    // Handle editing streams
    const editMultipleStreams = useCallback(
        (newStreamState: MergedStreamInput) => {
            selectedStreams.forEach((streamId) =>
                updateStreams(streamId, newStreamState)
            );
        },
        [selectedStreams, updateStreams]
    );

    // Handle fetching from public timetable
    const [
        fetchFromPublicTimetable,
        { data: publicTimetableData, loading: publicTimetableLoading },
    ] = useLazyQueryWithError(useStreamsFromPublicTimetableLazyQuery, {});

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
            const { name, type, day, startTime, endTime, weeks, location } =
                stream;
            createStream({
                name,
                type,
                day,
                startTime,
                endTime,
                location,
                numberOfTutorsForWeeks: weeks.map((week) => ({
                    week,
                    numberOfTutors: 1,
                })),
            });
        });
    }, [publicTimetableData, createStream]);

    // Handle editing sessions
    const editMultipleSessions = useCallback(
        (updatedFields: SessionFields) => {
            selectedSessions.forEach((sessionId) => {
                updateSessions(sessionId, updatedFields);
            });
        },
        [selectedSessions, updateSessions]
    );

    // Handle submitting changes
    const [
        submitUpdatedStream,
        { data: updatedStreamsData, loading: updatedStreamsLoading },
    ] = useMutationWithError(useUpdateSessionStreamsMutation, {});
    const [
        submitMergedStreams,
        { data: addMergedStreamsData, loading: addMergedStreamsLoading },
    ] = useMutationWithError(useAddMergedSessionStreamsMutation, {});
    const [
        submitDeletedStreams,
        { data: deletedStreamsData, loading: deletedStreamsLoading },
    ] = useMutationWithError(useDeleteSessionStreamsMutation, {});
    const [
        submitStreamAllocations,
        {
            data: updatedStreamAllocationData,
            loading: updatedStreamAllocationLoading,
        },
    ] = useMutationWithError(useUpdateStreamAllocationsMutation, {});

    const [
        submitUpdatedSessions,
        { data: updatedSessionsData, loading: updatedSessionsLoading },
    ] = useMutationWithError(useUpdateSessionMutation, {});
    const [
        submitDeletedSessions,
        { data: deletedSessionsData, loading: deletedSessionsLoading },
    ] = useMutationWithError(useDeleteSessionsMutation, {});
    const [
        submitSessionAllocations,
        {
            data: updatedSessionAllocationsData,
            loading: updatedSessionsAllocationLoading,
        },
    ] = useMutationWithError(useUpdateSessionAllocationMutation, {});

    const submitChanges = useCallback(() => {
        if (createdStreams.size > 0) {
            submitMergedStreams({
                variables: {
                    sessionStreams: createdStreams
                        .valueSeq()
                        .map((input) => ({
                            ...input,
                            courseId,
                            termId,
                        }))
                        .toArray(),
                },
            });
        }
        if (modifiedStreams.size > 0) {
            submitUpdatedStream({
                variables: {
                    updateStreamInput: modifiedStreams
                        .entrySeq()
                        .map(([id, input]) => ({
                            ...input,
                            streamId: id,
                        }))
                        .toArray(),
                },
            });
        }
        if (deletedStreams.size > 0) {
            submitDeletedStreams({
                variables: {
                    streamIds: deletedStreams
                        .merge(deleteModifiedStreams)
                        .keySeq()
                        .toArray(),
                },
            });
        }
        if (modifiedStreamAllocations.size > 0) {
            submitStreamAllocations({
                variables: {
                    changeAllocationInput: modifiedStreamAllocations
                        .entrySeq()
                        .map(([id, input]) => ({
                            ...input,
                            streamId: id,
                        }))
                        .toArray(),
                },
            });
        }
        if (modifiedSessions.size > 0) {
            submitUpdatedSessions({
                variables: {
                    updateSessionInput: modifiedSessions
                        .entrySeq()
                        .map(([id, input]) => ({
                            id,
                            ...input,
                        }))
                        .toArray(),
                },
            });
        }
        if (deletedSessions.size > 0) {
            submitDeletedSessions({
                variables: {
                    sessionIds: deletedSessions
                        .merge(deleteModifiedSessions)
                        .keySeq()
                        .toArray(),
                },
            });
        }
        if (modifiedStreamAllocations.size > 0) {
            submitSessionAllocations({
                variables: {
                    newAllocation: modifiedSessionAllocations
                        .entrySeq()
                        .map(([sessionId, input]) => ({
                            rootSessionId: sessionId,
                            ...input,
                        }))
                        .toArray(),
                },
            });
        }
    }, [
        courseId,
        termId,
        createdStreams,
        submitMergedStreams,
        deleteModifiedSessions,
        deleteModifiedStreams,
        deletedSessions,
        deletedStreams,
        modifiedSessionAllocations,
        modifiedSessions,
        modifiedStreamAllocations,
        modifiedStreams,
        submitDeletedSessions,
        submitDeletedStreams,
        submitSessionAllocations,
        submitStreamAllocations,
        submitUpdatedSessions,
        submitUpdatedStream,
    ]);

    useEffect(() => {
        if (!updatedStreamsData) {
            return;
        }
        updatedStreamsData.updateSessionStreams.forEach((stream) => {
            commitStream(stream.id, streamToInput(stream));
        });
    }, [updatedStreamsData, commitStream, streamToInput]);

    useEffect(() => {
        if (!addMergedStreamsData) {
            return;
        }
        addMergedStreamsData.addMergedSessionStreams.forEach((stream) => {
            commitStream(stream.id, streamToInput(stream));
        });
    }, [addMergedStreamsData, streamToInput, commitStream]);

    useEffect(() => {
        if (!deletedStreamsData) {
            return;
        }
        deletedStreamsData.deleteSessionStreams.forEach((streamId) => {
            commitRemoveStream(streamId);
            commitRemoveStreamAllocation(streamId);
        });
    }, [
        deletedStreamsData,
        streamToInput,
        commitRemoveStream,
        commitRemoveStreamAllocation,
    ]);

    useEffect(() => {
        if (!updatedStreamAllocationData) {
            return;
        }
        updatedStreamAllocationData.updateStreamAllocations.forEach(
            (stream) => {
                commitStreamAllocations(stream.id, {
                    allocation: getStreamAllocationPattern(stream),
                });
            }
        );
    }, [updatedStreamAllocationData, commitStreamAllocations]);

    useEffect(() => {
        if (!updatedSessionsData) {
            return;
        }
        updatedSessionsData.updateSession.forEach((session) => {
            commitSession(session.id, session);
        });
    }, [updatedSessionsData, commitSession]);

    useEffect(() => {
        if (!deletedSessionsData) {
            return;
        }
        deletedSessionsData.deleteSessions.forEach((sessionId) => {
            commitRemoveSession(sessionId);
            commitRemoveSessionAllocation(sessionId);
        });
    }, [
        deletedSessionsData,
        streamToInput,
        commitRemoveSession,
        commitRemoveSessionAllocation,
    ]);

    useEffect(() => {
        if (!updatedSessionAllocationsData) {
            return;
        }
        updatedSessionAllocationsData.updateSessionAllocations.forEach(
            (session) => {
                commitSessionAllocations(session.id, {
                    newAllocation: session.allocatedUsers.map(
                        (user) => user.id
                    ),
                });
            }
        );
    }, [updatedSessionAllocationsData, commitSessionAllocations]);

    // TODO: Implement week cache
    // Save it to state
    // Allow user to modify
    // TODO: User cannot modify session weeks if allocation exists
    // TODO: User can (de)allocate other users from sessions
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
        },
        timetableState: {
            unchangedStreams,
            createdStreams,
            deletedStreams,
            modifiedStreams,
            deleteModifiedStreams,
            createStream,
            deleteStream,
            commitStream,
            commitRemoveStream,
            permDeleteStreams,
            clearStreams,
            resetStreams,
            restoreStreams,
            updateStreams,
            unchangedSessions,
            createdSessions,
            deletedSessions,
            modifiedSessions,
            deleteModifiedSessions,
            commitSession,
            commitRemoveSession,
            createSession,
            deleteSession,
            permDeleteSessions,
            clearSessions,
            resetSessions,
            restoreSessions,
            updateSessions,
            unchangedStreamAllocations,
            modifiedStreamAllocations,
            updateStreamAllocations,
            resetStreamAllocations,
            commitStreamAllocations,
            commitRemoveStreamAllocation,
            unchangedSessionAllocations,
            modifiedSessionAllocations,
            updateSessionAllocations,
            resetSessionAllocation,
            commitSessionAllocations,
            commitRemoveSessionAllocation,
        },
        actions: {
            editMultipleStreams,
            getStreamsFromPublicTimetable,
            editMultipleSessions,
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
            updatedStreamAllocationLoading ||
            publicTimetableLoading ||
            updatedSessionsLoading ||
            updatedSessionsAllocationLoading ||
            deletedSessionsLoading,
    };
};
