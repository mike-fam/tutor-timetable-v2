import { Dispatch, SetStateAction, useState } from "react";

export type RequestDuration = "Permanent" | "Temporary";
export type RequestFormState = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    course: string;
    setCourse: Dispatch<SetStateAction<string>>;
    session: string;
    setSession: Dispatch<SetStateAction<string>>;
    preferences: Array<string>;
    updatePreferences: (value: Array<string> | string) => void;
    duration: RequestDuration;
    setDuration: Dispatch<SetStateAction<RequestDuration>>;
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
    const [course, setCourse] = useState<string>(initialState?.course || "");
    const [title, setTitle] = useState<string>(initialState?.title || "");
    const [description, setDescription] = useState<string>(
        initialState?.description || ""
    );
    const [session, setSession] = useState<string>(initialState?.session || "");
    const [preferences, setPreferences] = useState<Array<string>>(
        initialState?.preferences || []
    );
    const [duration, setDuration] = useState<RequestDuration>(
        initialState?.duration || "Temporary"
    );
    const updatePreferences = (value: Array<string> | string) => {
        setPreferences(value instanceof Array ? value : [value]);
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
        updatePreferences,
        duration,
        setDuration,
    };
};
