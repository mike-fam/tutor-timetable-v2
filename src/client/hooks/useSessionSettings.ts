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
import { useEffect, useState } from "react";
import { defaultStr } from "../constants";
import { MergedStreamInput, UpdateSessionInput, useGetSessionStreamsLazyQuery } from "../generated/graphql";
import { useLazyQueryWithError } from "./useApolloHooksWithError";
import { useTermCourse } from "./useTermCourse";
import { useModificationMap } from "./useModificationMap";

export const useSessionSettings = () => {
    const { courseId, termId, changeCourse, changeTerm } = useTermCourse();
    const {
        unchanged: unchangedStreams,
        created: createdStreams,
        deleted: deletedStreams,
        modified: modifiedStreams,
        deleteModified: deleteModifiedStreams,
        createItem: createStream,
        deleteItem: deleteStream,
        clearItems: clearStreams,
        resetItems: resetStreams,
        restoreItem: restoreStreams,
        updateItem: updateStreams,
    } = useModificationMap<MergedStreamInput>();
    const {
        unchanged: unchangedSessions,
        created: createdSessions,
        deleted: deletedSessions,
        modified: modifiedSessions,
        deleteModified: deleteModifiedSessions,
        createItem: createSession,
        deleteItem: deleteSession,
        clearItems: clearSessions,
        resetItems: resetSessions,
        restoreItem: restoreSessions,
        updateItem: updateSessions,
    } = useModificationMap<UpdateSessionInput>();
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
        resetStreams(getSessionStreamsData.sessionStreams.map(stream => ([stream.id, {
            courseId,
            termId,
            name: stream.name,
            type: stream.type,
            day: stream.day,
            startTime: stream.startTime,
            endTime: stream.endTime,
            location: stream.location,
            numberOfTutorsForWeeks: [] // TODO: change
        }])))
    }, [getSessionStreamsData, courseId, termId, resetStreams]);
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
