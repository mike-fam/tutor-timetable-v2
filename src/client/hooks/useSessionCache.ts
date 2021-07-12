import { Map } from "immutable";
import { SessionResponseType } from "../types/session";
import { useLazyQueryWithError } from "./useApolloHooksWithError";
import {
    GetSessionsQueryVariables,
    useGetSessionByIdLazyQuery,
    useGetSessionsLazyQuery,
} from "../generated/graphql";
import { useCallback, useEffect, useState } from "react";
import { QueryLazyOptions } from "@apollo/client/react/types/types";

type SessionMap = Map<string, SessionResponseType>;

export type SessionCache = {
    sessions: SessionMap;
    getSession: (sessionId: string) => SessionResponseType | undefined;
    fetchSessions: (
        options?: QueryLazyOptions<GetSessionsQueryVariables>
    ) => void;
};

export const useSessionCache = (): SessionCache => {
    const [sessions, setSessions] = useState<SessionMap>(
        Map<string, SessionResponseType>()
    );
    const [fetchSessions, { data: sessionsData }] = useLazyQueryWithError(
        useGetSessionsLazyQuery,
        {}
    );
    const [fetchSessionById, { data: sessionData }] = useLazyQueryWithError(
        useGetSessionByIdLazyQuery,
        {}
    );
    const getSession = useCallback(
        (sessionId: string) => {
            const session = sessions.get(sessionId);
            if (!session) {
                fetchSessionById({
                    variables: {
                        sessionId,
                    },
                });
            }
            return session;
        },
        [sessions, fetchSessionById]
    );
    useEffect(() => {
        if (!sessionData) {
            return;
        }
        setSessions((prev) =>
            prev.set(sessionData.sessionById.id, sessionData.sessionById)
        );
    }, [sessionData]);
    useEffect(() => {
        if (!sessionsData) {
            return;
        }
        sessionsData.sessions.forEach((session) => {
            setSessions((prev) => prev.set(session.id, session));
        });
    });
    return {
        sessions,
        fetchSessions,
        getSession,
    };
};
