import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { RequestType } from "../generated/graphql";
import { Set } from "immutable";

export type RequestFormState = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    course: number;
    setCourse: Dispatch<SetStateAction<number>>;
    session: number;
    setSession: Dispatch<SetStateAction<number>>;
    preferences: Set<number>;
    setPreferences: Dispatch<SetStateAction<Set<number>>>;
    addPreference: (sessionId: number) => void;
    removePreference: (sessionId: number) => void;
    duration: RequestType;
    setDuration: Dispatch<SetStateAction<RequestType>>;
    resetFormState: () => void;
};

/**
 * Note: This might not be the best way to store data
 * I personally like to store the id with the course/session/request entries
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
            | "duration"
        >
    >
): RequestFormState => {
    const [course, setCourse] = useState<number>(initialState?.course || -1);
    const [title, setTitle] = useState<string>(initialState?.title || "");
    const [description, setDescription] = useState<string>(
        initialState?.description || ""
    );
    const [session, setSession] = useState<number>(initialState?.session || -1);
    const [preferences, setPreferences] = useState<Set<number>>(
        initialState?.preferences || Set()
    );
    const [duration, setDuration] = useState<RequestType>(
        initialState?.duration || RequestType.Temporary
    );
    const addPreference = useCallback((sessionId: number) => {
        setPreferences((prev) => prev.add(sessionId));
    }, []);
    const removePreference = useCallback((sessionId: number) => {
        setPreferences((prev) => prev.remove(sessionId));
    }, []);
    const resetFormState = () => {
        setCourse(-1);
        setTitle("");
        setDescription("");
        setSession(-1);
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
        duration,
        setDuration,
        resetFormState,
    };
};
