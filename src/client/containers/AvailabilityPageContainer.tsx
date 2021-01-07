import React, { useState } from "react";
import { AvailabilityTimetableContainer } from "./AvailabilityTimetableContainer";
import { Map, Set } from "immutable";
import { AvailabilityContext } from "../utils/availability";
import { TempTimeslot } from "../types/availability";

type Props = {};

export const AvailabilityPageContainer: React.FC<Props> = ({}) => {
    const [tempAddedTimeslots, setTempAddedTimeslots] = useState(
        Map<number, TempTimeslot>()
    );
    const [tempRemovedTimeslots, setTempRemovedTimeslots] = useState(
        Set<number>()
    );
    const [tempUpdatedTimeslots, setTempUpdatedTimeslots] = useState(
        Map<number, TempTimeslot>()
    );
    return (
        <AvailabilityContext.Provider
            value={{
                tempAddedTimeslots,
                tempRemovedTimeslots,
                tempUpdatedTimeslots,
                setTempAddedTimeslots,
                setTempRemovedTimeslots,
                setTempUpdatedTimeslots,
            }}
        >
            <AvailabilityTimetableContainer />
        </AvailabilityContext.Provider>
    );
};
