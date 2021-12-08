import { ArrayElement } from "./helpers";
import { GetMergedSessionsQuery, GetSessionsQuery } from "../generated/graphql";
import { Map } from "immutable";
import { Dispatch, SetStateAction } from "react";

export type SessionResponseType = ArrayElement<GetSessionsQuery["sessions"]>;

export enum SessionAvailabilityStatus {
    CLASHED,
    UNAVAILABLE,
    AVAILABLE,
    UNDERTERMINED,
}

export type SessionMap = Map<string, SessionResponseType>;
export type SessionUtil = {
    sessions: SessionMap;
    setSessions: Dispatch<SetStateAction<SessionMap>>;
    sessionsData?: GetMergedSessionsQuery;
    fetchSessions: (
        termId: string,
        courseIds: string[],
        chosenWeek: number
    ) => void;
    fetchSessionById: (sessionId: string) => void;
    loading: boolean;
};

export enum SessionTheme {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY",
    OTHER = "OTHER",
}
