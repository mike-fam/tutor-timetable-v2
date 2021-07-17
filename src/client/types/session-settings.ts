import {
    ModificationType,
    StreamAllocationPattern,
    StreamTutorNumbersPattern,
    UpdateSessionInput,
} from "../generated/graphql";
import { SessionResponseType } from "./session";
import { StreamResponseType } from "./session-stream";
import { useSessionSettings } from "../hooks/useSessionSettings";

export type SessionFields = Omit<UpdateSessionInput, "id">;

export type SessionSettingsUtils = ReturnType<typeof useSessionSettings>;

export type SessionSettingsModificationType = {
    settingsModification: ModificationType;
    allocationModification: ModificationType;
};

export type SessionResponseWithModification = SessionResponseType &
    SessionSettingsModificationType;
export type StreamState = Omit<
    StreamResponseType,
    | "secondaryStreams"
    | "allocatedUsers"
    | "numberOfStaff"
    | "weeks"
    | "timetable"
    > & {
    numberOfTutorsForWeeks: StreamTutorNumbersPattern[];
    allocation: StreamAllocationPattern[];
};

export type StreamStateWithModification = StreamState &
    SessionSettingsModificationType;
