import { useCallback, useState } from "react";
import { RequestType } from "../generated/graphql";
import { Set } from "immutable";
import { RequestFormState } from "../types/requests";
import { defaultStr } from "../constants";

/**
 * Note: This might not be the best way to store data
 * I personally like to store the id with the course/session/request entries
 *
 * @param {Partial<RequestFormState>} initialState optional initial state of
 *      request
 * @returns {RequestFormState} request form state used for management.
 */
export const useRequestFormState = (
    initialState?: Partial<
        Pick<
            RequestFormState,
            | "course"
            | "title"
            | "description"
            | "session"
            | "preferences"
            | "type"
        >
    >
): RequestFormState => {
    const [course, setCourse] = useState<string>(
        initialState?.course || defaultStr
    );
    const [title, setTitle] = useState<string>(
        initialState?.title || defaultStr
    );
    const [description, setDescription] = useState<string>(
        initialState?.description || defaultStr
    );
    const [session, setSession] = useState<string>(
        initialState?.session || defaultStr
    );
    const [preferences, setPreferences] = useState<Set<string>>(
        initialState?.preferences || Set()
    );
    const [duration, setDuration] = useState<RequestType>(
        initialState?.type || RequestType.Temporary
    );
    const addPreference = useCallback((sessionId: string) => {
        setPreferences((prev) => prev.add(sessionId));
    }, []);
    const removePreference = useCallback((sessionId: string) => {
        setPreferences((prev) => prev.remove(sessionId));
    }, []);
    const resetFormState = () => {
        setCourse(defaultStr);
        setTitle(defaultStr);
        setDescription(defaultStr);
        setSession(defaultStr);
        setPreferences(Set());
        setDuration(RequestType.Temporary);
    };

    return {
        course,
        setCourse,
        title,
        setTitle,
        description,
        session,
        setSession,
        setDescription,
        preferences,
        setPreferences,
        addPreference,
        removePreference,
        type: duration,
        setDuration,
        resetFormState,
    };
};
