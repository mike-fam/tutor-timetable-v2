export enum RequestType {
    PERMANENT = "Permanent",
    TEMPORARY = "Temporary",
}

export enum RequestStatus {
    OPEN = "Open",
    CLOSED = "Closed",
}

export const TEMPORARY_LOCK_MESSAGE =
    "Temporary requests are currently frozen. " +
    "Please contact your supervisor.";

export const PERMANENT_LOCK_MESSAGE =
    "Permanent requests are currently frozen. " +
    "Please contact your supervisor.";
