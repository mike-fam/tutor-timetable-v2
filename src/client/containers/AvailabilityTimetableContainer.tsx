import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Timetable } from "../components/timetable/Timetable";
import { Day } from "../components/timetable/Day";
import { Props as SessionProps } from "../components/timetable/Session";
import { AvailabilityTimeslot } from "../components/availabilities/AvailabilityTimeslot";
import { TimetableSettingsContext } from "../utils/timetable";
import { AvailabilityContext } from "../utils/availability";
import { Map } from "immutable";
import {
    AvailabilityTimeslotType,
    ModificationType,
    ModifyTimeslotParams,
    TempTimeslot,
} from "../types/availability";
import { AvailabilitySession } from "./AvailabilitySession";
import { TimetableSession } from "../types/timetable";
import { IsoDay } from "../../types/date";

type Props = {};
// Hardcoded Sessions
const hardcodedSessions: TimetableSession[] = [
    {
        id: 1,
        name: "",
        startTime: 7.4,
        endTime: 8.5,
        day: IsoDay.TUE,
    },
    {
        id: 2,
        name: "",
        startTime: 15,
        endTime: 16,
        day: IsoDay.WED,
    },
    {
        id: 3,
        name: "",
        startTime: 8,
        endTime: 23,
        day: IsoDay.THU,
    },
    {
        id: 4,
        name: "",
        startTime: 10,
        endTime: 13,
        day: IsoDay.FRI,
    },
    {
        id: 5,
        name: "",
        startTime: 12,
        endTime: 15,
        day: IsoDay.FRI,
    },
];

export const AvailabilityTimetableContainer: React.FC<Props> = ({}) => {
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    const [tempAddIndex, setTempAddIndex] = useState(-1);
    const {
        existingTimeslots,
        setExistingTimeslots,
        tempRemovedTimeslots,
        setTempRemovedTimeslots,
    } = useContext(AvailabilityContext);
    // TODO: get sessions from server
    const [initialTimeslots, setInitialTimeslots] = useState(
        Map<number, AvailabilityTimeslotType>()
    );
    // TODO: This is just for dummy data, remove this and replace it
    //  with actual data from the server
    useEffect(() => {
        hardcodedSessions.forEach((session) => {
            setInitialTimeslots((prev) =>
                prev.set(session.id, {
                    ...session,
                    type: ModificationType.UNCHANGED,
                })
            );
        });
    }, []);

    useEffect(() => {
        setExistingTimeslots(initialTimeslots);
    }, [initialTimeslots, setExistingTimeslots]);

    const sessions = useMemo(() => {
        return existingTimeslots.toArray().map(([id, timeslot]) => ({
            ...timeslot,
            id,
            name: "", // Just to be typesafe
        }));
    }, [existingTimeslots]);

    const addTempTimeslot = useCallback(
        (timeslot: TempTimeslot) => {
            setExistingTimeslots((prev) =>
                prev.set(tempAddIndex, {
                    ...timeslot,
                    type: ModificationType.ADDED,
                })
            );
            setTempAddIndex((prev) => prev - 1);
        },
        [tempAddIndex, setExistingTimeslots]
    );

    const modifyTimeslot = useCallback(
        (
            timeslotId: number,
            modificationType: ModificationType,
            newTimeslotProps: ModifyTimeslotParams
        ) => {
            const session = existingTimeslots.get(timeslotId);
            if (!session) {
                return;
            }
            if (
                timeslotId > 0 &&
                modificationType === ModificationType.UNCHANGED
            ) {
                setExistingTimeslots((prev) =>
                    prev.set(timeslotId, {
                        ...session,
                        ...newTimeslotProps,
                        type: ModificationType.MODIFIED,
                    })
                );
            } else {
                setExistingTimeslots((prev) =>
                    prev.set(timeslotId, {
                        ...session,
                        ...newTimeslotProps,
                    })
                );
            }
        },
        [existingTimeslots, setExistingTimeslots]
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
                            addNewTimeslot={addTempTimeslot}
                        />
                    )}
                    renderSession={(sessionProps: SessionProps, key) => (
                        <AvailabilitySession
                            {...sessionProps}
                            key={key}
                            modificationType={
                                sessionProps.id < 0
                                    ? ModificationType.ADDED
                                    : existingTimeslots.get(sessionProps.id)
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