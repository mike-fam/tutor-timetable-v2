import { createContext, useCallback, useEffect, useState } from "react";
import { Map } from "immutable";
import { SessionMap, SessionResponseType, SessionUtil } from "../types/session";
import { useLazyQueryWithError } from "./useApolloHooksWithError";
import {
    useGetMergedSessionsLazyQuery,
    useGetSessionByIdLazyQuery,
} from "../generated/graphql";
import { defaultInt, defaultStr } from "../constants";

export const SessionsContext = createContext<SessionUtil>({
    sessions: Map<string, SessionResponseType>(),
    setSessions: () => {},
    fetchSessions: () => {},
    fetchSessionById: () => {},
    loading: false,
});

export const useSessionUtils = (): SessionUtil => {
    const [sessions, setSessions] = useState<SessionMap>(
        Map<string, SessionResponseType>()
    );
    const [getSession, { data: sessionsData, loading: getSessionsLoading }] =
        useLazyQueryWithError(useGetMergedSessionsLazyQuery, {
            fetchPolicy: "cache-and-network",
        });
    const [
        getSessionById,
        { data: sessionData, loading: getSessionByIdLoading },
    ] = useLazyQueryWithError(useGetSessionByIdLazyQuery, {});
    const fetchSessions = useCallback(
        (termId: string, courseIds: string[], chosenWeek: number) => {
            if (
                termId === defaultStr ||
                courseIds.length === 0 ||
                chosenWeek === defaultInt
            ) {
                return;
            }
            getSession({
                variables: {
                    termId,
                    courseIds,
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
        sessionsData.mergedSessions.forEach((session) => {
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
