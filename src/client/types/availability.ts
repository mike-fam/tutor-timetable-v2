import React from "react";
import { TimetableSession } from "./timetable";
import { Map, Set } from "immutable";

export type TempTimeslot = Omit<TimetableSession, "name">;

export type AvailabilityTimeslotType = TempTimeslot & {
    type: ModificationType;
};

export type AvailabilityState = {
    existingTimeslots: Map<number, AvailabilityTimeslotType>;
    tempRemovedTimeslots: Set<number>;
    setExistingTimeslots: React.Dispatch<
        React.SetStateAction<Map<number, AvailabilityTimeslotType>>
    >;
    setTempRemovedTimeslots: React.Dispatch<React.SetStateAction<Set<number>>>;
};

export enum ModificationType {
    UNCHANGED,
    ADDED,
    MODIFIED,
    REMOVED,
    REMOVED_MODIFIED,
}

export type ModifyTimeslotParams = Partial<AvailabilityTimeslotType>;
