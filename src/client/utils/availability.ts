import { createContext } from "react";
import { AvailabilityState } from "../types/availability";
import { Map, Set } from "immutable";

export const AvailabilityContext = createContext<AvailabilityState>({
    tempAddedTimeslots: Map(),
    tempRemovedTimeslots: Set(),
    tempUpdatedTimeslots: Map(),
    setTempAddedTimeslots: (prev) => prev,
    setTempRemovedTimeslots: (prev) => prev,
    setTempUpdatedTimeslots: (prev) => prev,
});
