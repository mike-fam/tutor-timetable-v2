import {
    ModificationType,
    StreamInput,
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

export type StreamSettingsModificationType = {
    settingsModification: ModificationType;
};

export type SessionResponseWithModification = SessionResponseType &
    SessionSettingsModificationType;

export type StreamInputWithModification = StreamInput &
    StreamSettingsModificationType;
