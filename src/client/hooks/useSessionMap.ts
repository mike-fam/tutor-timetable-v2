import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Map } from "immutable";
import { SessionResponseType } from "../types/session";
import { useLazyQueryWithError } from "./useQueryWithError";
import {
    GetSessionsQuery,
    useGetSessionsLazyQuery,
} from "../generated/graphql";
import { notSet } from "../constants";

type SessionMap = Map<number, SessionResponseType>;
export const useSessionMap = (
    termId: number,
    courseId: number
): {
    sessions: SessionMap;
    setSessions: Dispatch<SetStateAction<SessionMap>>;
    sessionsData?: GetSessionsQuery;
    fetchSessions: (chosenWeek: number) => void;
} => {
    const [sessions, setSessions] = useState<SessionMap>(Map());
    const [getSession, { data: sessionsData }] = useLazyQueryWithError(
        useGetSessionsLazyQuery
    );
    const fetchSessions = useCallback(
        (chosenWeek: number) => {
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
        [termId, courseId, getSession]
    );
    useEffect(() => {
        if (!sessionsData) {
            return;
        }
        sessionsData.sessions.forEach((session) => {
            setSessions((prev) => prev.set(session.id, session));
        });
    }, [sessionsData]);
    return { sessions, setSessions, sessionsData, fetchSessions };
};
