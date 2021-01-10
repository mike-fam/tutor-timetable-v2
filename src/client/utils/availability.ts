import { createContext } from "react";
import { AvailabilityState, ModificationType } from "../types/availability";
import { Map, Set } from "immutable";
import { SessionTheme } from "../types/timetable";

export const AvailabilityContext = createContext<AvailabilityState>({
    existingTimeslots: Map(),
    tempRemovedTimeslots: Set(),
    setExistingTimeslots: (prev) => prev,
    setTempRemovedTimeslots: (prev) => prev,
});

export const leftFillNum = (num: number, targetLength: number) => {
    return num.toString().padStart(targetLength, "0");
};

export const modificationTypeToTheme = (
    modificationType: ModificationType
): SessionTheme => {
    switch (modificationType) {
        case ModificationType.ADDED:
            return SessionTheme.SUCCESS;
        case ModificationType.MODIFIED:
            return SessionTheme.WARNING;
        case ModificationType.REMOVED:
            return SessionTheme.ERROR;
        case ModificationType.UNCHANGED:
            return SessionTheme.PRIMARY;
    }
};
