import {
    ModificationType, StreamAllocationPattern, StreamInput,
    UpdateSessionInput,
} from "../generated/graphql";
import { SessionResponseType } from "./session";
import { useSessionSettings } from "../hooks/useSessionSettings";

export type SessionFields = Omit<UpdateSessionInput, "id">;

export type SessionSettingsUtils = ReturnType<typeof useSessionSettings>;

export type SessionSettingsModificationType = {
    settingsModification: ModificationType;
    allocationModification: ModificationType;
};

export type StreamState = StreamInput & {
    allocations: StreamAllocationPattern[]
}

export type SessionResponseWithModification = SessionResponseType &
    SessionSettingsModificationType;

export type StreamStateWithModification = StreamState &
    SessionSettingsModificationType;
