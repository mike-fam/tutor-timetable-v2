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
import { Set } from "immutable";
import { defaultStr } from "../constants";
import {
    MergedStreamInput,
    SessionType,
    StreamInput,
    UpdateSessionInput,
    useGetSessionStreamsLazyQuery,
    useStreamsFromPublicTimetableLazyQuery,
} from "../generated/graphql";
import { useLazyQueryWithError } from "./useApolloHooksWithError";
import { useTermCourse } from "./useTermCourse";
import { useModificationMap } from "./useModificationMap";
import { useMultiSelection } from "./useMultiSelection";

export const useSessionSettings = () => {
    const { courseId, termId, changeCourse, changeTerm } = useTermCourse();
    const {
        selected: selectedStreams,
        select: selectStreams,
        deselect: deselectStreams,
    } = useMultiSelection<string>();
    const {
        selected: selectedSessions,
        select: selectSessions,
        deselect: deselectSessions,
    } = useMultiSelection<string>();
    const {
        unchanged: unchangedStreams,
        created: createdStreams,
        deleted: deletedStreams,
        modified: modifiedStreams,
        deleteModified: deleteModifiedStreams,
        createItem: createStream,
        deleteItem: deleteStream,
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
        createItem: createSession,
        deleteItem: deleteSession,
        permDeleteItems: permDeleteSessions,
        clearItems: clearSessions,
        resetItems: resetSessions,
        restoreItem: restoreSessions,
        updateItem: updateSessions,
    } = useModificationMap<UpdateSessionInput>();

    // Handle fetching streams
    const [fetchStream, { data: getSessionStreamsData, loading }] =
        useLazyQueryWithError(useGetSessionStreamsLazyQuery, {});
    // Fetch one first time
    useEffect(() => {
        if (!courseId || !termId) {
            return;
        }
        fetchStream({ variables: { courseIds: [courseId], termId } });
    }, [courseId, termId, fetchStream]);

    // Always update streams after fetching
    useEffect(() => {
        if (!getSessionStreamsData) {
            return;
        }
        resetStreams(
            getSessionStreamsData.sessionStreams.map((stream) => [
                stream.id,
                {
                    courseId,
                    termId,
                    name: stream.name,
                    type: stream.type,
                    day: stream.day,
                    startTime: stream.startTime,
                    endTime: stream.endTime,
                    location: stream.location,
                    numberOfTutorsForWeeks: [], // TODO: change
                },
            ])
        );
    }, [getSessionStreamsData, courseId, termId, resetStreams]);

    // Handle editing streams
    const editStreams = useCallback(
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

    const fromPublicTimetable = useCallback(
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
    const editSession = useCallback(
        (updatedFields: Omit<UpdateSessionInput, "id">) => {
            selectedSessions.forEach((sessionId) => {
                updateSessions(sessionId, { id: sessionId, ...updatedFields });
            });
        },
        [selectedSessions, updateSessions]
    );

    // TODO: Implement week cache
    // Save it to state
    // Allow user to modify
    // TODO: User cannot modify session weeks if allocation exists
    // TODO: User can (de)allocate other users from sessions
    return {
        courseId,
        termId,
        changeCourse,
        changeTerm,
        loading: loading,
    };
};
