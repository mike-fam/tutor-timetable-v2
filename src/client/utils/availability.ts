import { createContext } from "react";
import {
    AvailabilityResponseType,
    AvailabilityState,
} from "../types/availability";
import { Map } from "immutable";
import { AvailabilityModificationType, TimeslotInput } from "../generated/graphql";
import { SessionResponseType, SessionTheme } from "../types/session";

export const AvailabilityContext = createContext<AvailabilityState>({
    timeslots: Map<string, TimeslotInput>(),
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

export const isAvailable = (
    availabilities: AvailabilityResponseType,
    session: SessionResponseType
) => {
    const availabilityDay = availabilities
        .filter(
            (availability) => availability.day === session.sessionStream.day
        )
        .sort((availability1, availability2) => {
            if (availability1.startTime !== availability2.startTime) {
                return availability1.startTime - availability2.startTime;
            }
            return availability1.endTime - availability2.endTime;
        });
    let startCheck = session.sessionStream.startTime;
    for (const timeSlot of availabilityDay) {
        if (timeSlot.startTime > startCheck) {
            return false;
        }
        if (timeSlot.startTime <= startCheck && startCheck < timeSlot.endTime) {
            if (session.sessionStream.endTime <= timeSlot.endTime) {
                return true;
            }
            startCheck = timeSlot.endTime;
        }
    }
    return false;
};
