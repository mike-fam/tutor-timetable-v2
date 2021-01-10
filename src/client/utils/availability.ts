import { createContext } from "react";
import { AvailabilityState } from "../types/availability";
import { Map, Set } from "immutable";

export const AvailabilityContext = createContext<AvailabilityState>({
    modifiedTimeslots: Map(),
    tempRemovedTimeslots: Set(),
    setModifiedTimeslots: (prev) => prev,
    setTempRemovedTimeslots: (prev) => prev,
});

export const leftFillNum = (num: number, targetLength: number) => {
    return num.toString().padStart(targetLength, "0");
};
