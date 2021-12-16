import { Dispatch, SetStateAction } from "react";
import { TimetableSessionType } from "./timetable";
import { Map } from "immutable";
import { MyAvailabilityQuery, TimeslotInput } from "../generated/graphql";

export type TempTimeslot = Omit<TimetableSessionType, "name">;

export type AvailabilityState = {
    timeslots: Map<string, TimeslotInput>;
    setTimeslots: Dispatch<SetStateAction<Map<string, TimeslotInput>>>;
};

export type ModifyTimeslotParams = Partial<TimeslotInput>;

export type AvailabilityResponseType = MyAvailabilityQuery["myAvailability"];
