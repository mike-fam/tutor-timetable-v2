import React, { useCallback, useContext, useMemo, useState } from "react";
import { Timetable } from "../components/timetable/Timetable";
import { Day } from "../components/timetable/Day";
import { Props as SessionProps } from "../components/timetable/Session";
import { AvailabilityTimeslot } from "../components/availabilities/AvailabilityTimeslot";
import {
    sessionStyleFromProps,
    TimetableSettingsContext,
} from "../utils/timetable";
import { AvailabilityContext } from "../utils/availability";
import {
    ModificationType,
    ModifyTimeslotParams,
    TempTimeslot,
} from "../types/availability";
import { AvailabilitySession } from "./AvailabilitySession";

type Props = {};

export const AvailabilityTimetableContainer: React.FC<Props> = ({}) => {
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    const [tempAddIndex, setModifiedIndex] = useState(-1);
    const { modifiedTimeslots, setModifiedTimeslots } = useContext(
        AvailabilityContext
    );
    // TODO: get sessions from server
    const sessions = useMemo(() => {
        const modifiedTimeslotsArray = modifiedTimeslots
            .toArray()
            .map(([id, timeslot]) => ({
                ...timeslot,
                id,
                name: "", // Just to be typesafe
            }));
        return [...modifiedTimeslotsArray];
    }, [modifiedTimeslots]);

    const addTempTimeslot = useCallback(
        (timeslot: TempTimeslot, type: ModificationType) => {
            setModifiedTimeslots((prev) =>
                prev.set(tempAddIndex, {
                    ...timeslot,
                    type,
                })
            );
            setModifiedIndex((prev) => prev - 1);
        },
        [tempAddIndex, setModifiedTimeslots]
    );

    const addNewTimeslot = useCallback(
        (timeslot: TempTimeslot) => {
            addTempTimeslot(timeslot, ModificationType.ADDED);
        },
        [addTempTimeslot]
    );

    const modifyTimeslot = useCallback(
        (
            timeslotId: number,
            modificationType: ModificationType,
            newTimeslotProps: ModifyTimeslotParams
        ) => {
            if (modificationType === ModificationType.UNCHANGED) {
                // TODO: if unchanged
                //      Remove specified timeslots from server
                //      Add to add list, with new props
                return;
            } else {
                const session = modifiedTimeslots.get(timeslotId);
                if (!session) {
                    return;
                }
                const newSession = {
                    ...session,
                    ...newTimeslotProps,
                };
                setModifiedTimeslots((prev) =>
                    prev.set(timeslotId, newSession)
                );
            }
        },
        [modifiedTimeslots, setModifiedTimeslots]
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
                        <AvailabilityTimeslot
                            key={key}
                            time={time}
                            day={day}
                            addNewTimeslot={addNewTimeslot}
                        />
                    )}
                    renderSession={(sessionProps: SessionProps, key) => (
                        <AvailabilitySession
                            {...sessionProps}
                            key={key}
                            modificationType={
                                sessionProps.id > 0
                                    ? ModificationType.UNCHANGED
                                    : modifiedTimeslots.get(sessionProps.id)
                                          ?.type || ModificationType.UNCHANGED
                            }
                            updateSession={modifyTimeslot}
                        />
                    )}
                    key={key}
                />
            )}
            sessions={sessions}
        />
    );
};
