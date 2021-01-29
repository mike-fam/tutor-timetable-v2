import { Dispatch, SetStateAction, useState } from "react";

export type RequestDuration = "Permanent" | "Temporary";
export type RequestFormState = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    course: number;
    setCourse: Dispatch<SetStateAction<number>>;
    session: number;
    setSession: Dispatch<SetStateAction<number>>;
    preferences: Array<number>;
    updatePreferences: (value: Array<number> | number) => void;
    duration: RequestDuration;
    setDuration: Dispatch<SetStateAction<RequestDuration>>;
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
    const [preferences, setPreferences] = useState<Array<number>>(
        initialState?.preferences || []
    );
    const [duration, setDuration] = useState<RequestDuration>(
        initialState?.duration || "Temporary"
    );
    const updatePreferences = (value: Array<number> | number) => {
        setPreferences(value instanceof Array ? value : [value]);
    };
    const resetFormState = () => {
        setCourse(-1);
        setTitle("");
        setDescription("");
        setSession(-1);
        setPreferences([]);
        setDuration("Temporary");
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
        resetFormState,
    };
};
