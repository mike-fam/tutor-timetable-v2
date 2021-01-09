import React from "react";
import { TimetableSession } from "./timetable";
import { Map, Set } from "immutable";

export type TempTimeslot = Omit<TimetableSession, "id">;

export type AvailabilityState = {
    tempAddedTimeslots: Map<number, TempTimeslot>;
    tempRemovedTimeslots: Set<number>;
    tempUpdatedTimeslots: Map<number, TempTimeslot>;
    setTempAddedTimeslots: React.Dispatch<
        React.SetStateAction<Map<number, TempTimeslot>>
    >;
    setTempRemovedTimeslots: React.Dispatch<React.SetStateAction<Set<number>>>;
    setTempUpdatedTimeslots: React.Dispatch<
        React.SetStateAction<Map<number, TempTimeslot>>
    >;
};

export enum ModificationTypes {
    UNCHANGED,
    ADDED,
    REMOVED,
    MODIFIED,
}
