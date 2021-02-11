import React from "react";
import { TimetableSessionType } from "./timetable";
import { Map } from "immutable";
import { MyAvailabilityQuery, TimeslotInput } from "../generated/graphql";

export type TempTimeslot = Omit<TimetableSessionType, "name">;

export type AvailabilityState = {
    timeslots: Map<number, TimeslotInput>;
    setTimeslots: React.Dispatch<
        React.SetStateAction<Map<number, TimeslotInput>>
    >;
};

export type ModifyTimeslotParams = Partial<TimeslotInput>;

export type AvailabilityResponseType = MyAvailabilityQuery["myAvailability"];
