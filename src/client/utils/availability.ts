import { createContext } from "react";
import {
    AvailabilityResponseType,
    AvailabilityState,
} from "../types/availability";
import { Map } from "immutable";
import { ModificationType } from "../generated/graphql";
import { SessionResponseType, SessionTheme } from "../types/session";

export const AvailabilityContext = createContext<AvailabilityState>({
    timeslots: Map(),
    setTimeslots: (prev) => prev,
});

export const leftFillNum = (num: number, targetLength: number) => {
    return num.toString().padStart(targetLength, "0");
};

export const modificationTypeToTheme = (
    modificationType: ModificationType
): SessionTheme => {
    switch (modificationType) {
        case ModificationType.Added:
            return SessionTheme.SUCCESS;
        case ModificationType.Modified:
            return SessionTheme.WARNING;
        case ModificationType.Removed:
        case ModificationType.RemovedModified:
            return SessionTheme.ERROR;
        case ModificationType.Unchanged:
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
