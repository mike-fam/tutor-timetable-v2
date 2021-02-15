import { createContext, useCallback, useEffect, useState } from "react";
import { Map } from "immutable";
import { SessionMap, SessionUtil } from "../types/session";
import { useLazyQueryWithError } from "./useQueryWithError";
import {
    useGetSessionByIdLazyQuery,
    useGetSessionsLazyQuery,
} from "../generated/graphql";
import { notSet } from "../constants";

export const SessionsContext = createContext<SessionUtil>({
    sessions: Map(),
    setSessions: () => {},
    fetchSessions: () => {},
    fetchSessionById: () => {},
});

export const useSessionUtils = (): SessionUtil => {
    const [sessions, setSessions] = useState<SessionMap>(Map());
    const [getSession, { data: sessionsData }] = useLazyQueryWithError(
        useGetSessionsLazyQuery
    );
    const [getSessionById, { data: sessionData }] = useLazyQueryWithError(
        useGetSessionByIdLazyQuery
    );
    const fetchSessions = useCallback(
        (termId: number, courseId: number, chosenWeek: number) => {
            if (
                termId === notSet ||
                courseId === notSet ||
                chosenWeek === notSet
            ) {
                return;
            }
            getSession({
                variables: {
                    termId,
                    courseIds: [courseId],
                    week: chosenWeek,
                },
            });
        },
        [getSession]
    );
    const fetchSessionById = useCallback(
        (sessionId: number) => {
            if (sessionId === notSet) {
                return;
            }
            getSessionById({
                variables: {
                    sessionId,
                },
            });
        },
        [getSessionById]
    );
    useEffect(() => {
        if (!sessionsData) {
            return;
        }
        sessionsData.sessions.forEach((session) => {
            setSessions((prev) => prev.set(session.id, session));
        });
    }, [sessionsData]);
    useEffect(() => {
        if (!sessionData) {
            return;
        }
        setSessions((prev) =>
            prev.set(sessionData.sessionById.id, sessionData.sessionById)
        );
    }, [sessionData]);
    return {
        sessions,
        setSessions,
        sessionsData,
        fetchSessions,
        fetchSessionById,
    };
};
