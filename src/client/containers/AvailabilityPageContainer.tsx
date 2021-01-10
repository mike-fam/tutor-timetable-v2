import React, { useState } from "react";
import { AvailabilityTimetableContainer } from "./AvailabilityTimetableContainer";
import { Map, Set } from "immutable";
import { AvailabilityContext } from "../utils/availability";
import { AvailabilityTimeslotType, TempTimeslot } from "../types/availability";

type Props = {};

export const AvailabilityPageContainer: React.FC<Props> = ({}) => {
    const [modifiedTimeslots, setModifiedTimeslots] = useState(
        Map<number, AvailabilityTimeslotType>()
    );
    const [tempRemovedTimeslots, setTempRemovedTimeslots] = useState(
        Set<number>()
    );
    return (
        <AvailabilityContext.Provider
            value={{
                modifiedTimeslots,
                tempRemovedTimeslots,
                setModifiedTimeslots,
                setTempRemovedTimeslots,
            }}
        >
            <AvailabilityTimetableContainer />
        </AvailabilityContext.Provider>
    );
};
