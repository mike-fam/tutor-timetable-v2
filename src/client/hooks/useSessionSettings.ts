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
import {
    MergedStreamInput,
    useGetSessionStreamsLazyQuery,
} from "../generated/graphql";
import { List } from "immutable";
import { useLazyQueryWithError } from "./useQueryWithError";

export const useSessionSettings = () => {
    const [courseId, setCourseId] = useState(defaultStr);
    const [termId, setTermId] = useState(defaultStr);
    const [fetchStream, { data: getSessionStreamsData, loading }] =
        useLazyQueryWithError(useGetSessionStreamsLazyQuery);
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
        // setStreams(
        //     List(getSessionStreamsData.sessionStreams.map((stream) => ({
        //
        //     })))
        // );
    }, [getSessionStreamsData]);
    // TODO: Implement week cache
    // Save it to state
    // Allow user to modify
    // TODO: User cannot modify session weeks if allocation exists
    // TODO: User can (de)allocate other users from sessions
    return {
        courseId,
        termId,
        setCourseId,
        setTermId
    }
};
