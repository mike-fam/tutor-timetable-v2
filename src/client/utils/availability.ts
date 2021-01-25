import { createContext } from "react";
import { AvailabilityState } from "../types/availability";
import { Map } from "immutable";
import { SessionTheme } from "../types/timetable";
import { AvailabilityModificationType } from "../generated/graphql";

export const AvailabilityContext = createContext<AvailabilityState>({
    timeslots: Map(),
    setTimeslots: (prev) => prev,
});

export const leftFillNum = (num: number, targetLength: number) => {
    return num.toString().padStart(targetLength, "0");
};

export const modificationTypeToTheme = (
    modificationType: AvailabilityModificationType
): SessionTheme => {
    switch (modificationType) {
        case AvailabilityModificationType.Added:
            return SessionTheme.SUCCESS;
        case AvailabilityModificationType.Modified:
            return SessionTheme.WARNING;
        case AvailabilityModificationType.Removed:
        case AvailabilityModificationType.RemovedModified:
            return SessionTheme.ERROR;
        case AvailabilityModificationType.Unchanged:
            return SessionTheme.PRIMARY;
    }
};
