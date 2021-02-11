import { ArrayElement } from "./helpers";
import { GetSessionsQuery } from "../generated/graphql";
import { Map } from "immutable";
import { Dispatch, SetStateAction } from "react";

export type SessionResponseType = ArrayElement<GetSessionsQuery["sessions"]>;

export enum SessionAvailabilityStatus {
    CLASHED,
    UNAVAILABLE,
    AVAILABLE,
    UNDERTERMINED,
}

export type SessionMap = Map<number, SessionResponseType>;
export type SessionUtil = {
    sessions: SessionMap;
    setSessions: Dispatch<SetStateAction<SessionMap>>;
    sessionsData?: GetSessionsQuery;
    fetchSessions: (
        termId: number,
        courseId: number,
        chosenWeek: number
    ) => void;
    fetchSessionById: (sessionId: number) => void;
};
