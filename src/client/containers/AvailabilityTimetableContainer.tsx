import React, { useCallback, useContext, useMemo, useState } from "react";
import { Timetable } from "../components/timetable/Timetable";
import { Day } from "../components/timetable/Day";
import {
    Props as SessionProps,
    Session,
} from "../components/timetable/Session";
import { AvailabilityTimeSlot } from "../components/availabilities/AvailabilityTimeSlot";
import { TimetableSettingsContext } from "../utils/timetable";
import { AvailabilityContext } from "../utils/availability";
import { TempTimeslot } from "../types/availability";

type Props = {};

export const AvailabilityTimetableContainer: React.FC<Props> = ({}) => {
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    const [tempAddIndex, setTempAddIndex] = useState(-1);
    const {
        tempAddedTimeslots,
        tempUpdatedTimeslots,
        setTempAddedTimeslots,
    } = useContext(AvailabilityContext);
    // TODO: get sessions from server
    const sessions = useMemo(() => {
        const modifiedTimeslotsMap = tempUpdatedTimeslots.merge(
            tempAddedTimeslots
        );
        const modifiedTimeslots = modifiedTimeslotsMap
            .toArray()
            .map(([id, timeslot]) => ({
                ...timeslot,
                id,
            }));
        return [...modifiedTimeslots];
    }, [tempAddedTimeslots, tempUpdatedTimeslots]);

    const addTempTimeslot = useCallback(
        (timeslot: TempTimeslot) => {
            setTempAddedTimeslots((prev) => prev.set(tempAddIndex, timeslot));
            setTempAddIndex((prev) => prev - 1);
        },
        [tempAddIndex, setTempAddedTimeslots]
    );

    return (
        <Timetable
            displayedDays={displayedDays}
            startTime={dayStartTime}
            endTime={dayEndTime}
            renderDay={(dayProps, key) => (
                <Day
                    {...dayProps}
                    renderTimeSlot={(key, time, day) => (
                        <AvailabilityTimeSlot
                            key={key}
                            time={time}
                            day={day}
                            addTempTimeslot={addTempTimeslot}
                        />
                    )}
                    renderSession={(sessionProps: SessionProps, key) => (
                        <Session {...sessionProps} key={key} />
                    )}
                    key={key}
                />
            )}
            sessions={sessions}
        />
    );
};
