import React from "react";
import { TimetableSession } from "./timetable";
import { Map, Set } from "immutable";
import { TimeslotInput } from "../generated/graphql";

export type TempTimeslot = Omit<TimetableSession, "name">;

export type AvailabilityState = {
    timeslots: Map<number, TimeslotInput>;
    setTimeslots: React.Dispatch<
        React.SetStateAction<Map<number, TimeslotInput>>
    >;
};

export type ModifyTimeslotParams = Partial<TimeslotInput>;
