import { createContext, useCallback, useEffect, useState } from "react";
import { Map } from "immutable";
import { SessionMap, SessionUtil } from "../types/session";
import { useLazyQueryWithError } from "./useQueryWithError";
import {
    useGetSessionByIdLazyQuery,
    useGetSessionsLazyQuery,
} from "../generated/graphql";
import { defaultInt, defaultStr } from "../constants";

export const SessionsContext = createContext<SessionUtil>({
    sessions: Map(),
    setSessions: () => {},
    fetchSessions: () => {},
    fetchSessionById: () => {},
    loading: false,
});

export const useSessionUtils = (): SessionUtil => {
    const [sessions, setSessions] = useState<SessionMap>(Map());
    const [getSession, { data: sessionsData, loading: getSessionsLoading }] =
        useLazyQueryWithError(useGetSessionsLazyQuery);
    const [
        getSessionById,
        { data: sessionData, loading: getSessionByIdLoading },
    ] = useLazyQueryWithError(useGetSessionByIdLazyQuery);
    const fetchSessions = useCallback(
        (termId: string, courseId: string, chosenWeek: number) => {
            if (
                termId === defaultStr ||
                courseId === defaultStr ||
                chosenWeek === defaultInt
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
        (sessionId: string) => {
            if (sessionId === defaultStr) {
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
        loading: getSessionByIdLoading || getSessionsLoading,
    };
};
