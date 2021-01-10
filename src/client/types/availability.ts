import React from "react";
import { TimetableSession } from "./timetable";
import { Map, Set } from "immutable";

export type TempTimeslot = Omit<TimetableSession, "id" | "name">;

export type AvailabilityTimeslotType = TempTimeslot & {
    type: ModificationType;
};

export type AvailabilityState = {
    modifiedTimeslots: Map<number, AvailabilityTimeslotType>;
    tempRemovedTimeslots: Set<number>;
    setModifiedTimeslots: React.Dispatch<
        React.SetStateAction<Map<number, AvailabilityTimeslotType>>
    >;
    setTempRemovedTimeslots: React.Dispatch<React.SetStateAction<Set<number>>>;
};

export enum ModificationType {
    UNCHANGED,
    ADDED,
    REMOVED,
    MODIFIED,
}

export type ModifyTimeslotParams = Partial<
    Pick<TimetableSession, "startTime" | "endTime">
>;
