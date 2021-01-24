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
import { AvailabilitySession } from "../components/availabilities/AvailabilitySession";
import { TimetableSession } from "../types/timetable";
import { IsoDay } from "../../types/date";
import { TimeslotModal } from "../components/availabilities/TimeslotModal";
import { useDisclosure } from "@chakra-ui/react";

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

export const AvailabilityTimetableContainer: React.FC<Props> = () => {
    // Timetable settings stuff
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    // Generate ids for added timeslots
    const [tempAddIndex, setTempAddIndex] = useState(-1);

    // Availability state and handlers
    const {
        existingTimeslots,
        setExistingTimeslots,
        tempRemovedTimeslots,
        setTempRemovedTimeslots,
    } = useContext(AvailabilityContext);

    // Modal stuff
    const {
        isOpen: isModalOpen,
        onClose: closeModal,
        onOpen: openModal,
    } = useDisclosure();
    const [editedSessionId, setEditedSessionId] = useState(0);

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
        (timeslot: Omit<TempTimeslot, "id">) => {
            setExistingTimeslots((prev) =>
                prev.set(tempAddIndex, {
                    ...timeslot,
                    id: tempAddIndex,
                    type: ModificationType.ADDED,
                })
            );
            setTempAddIndex((prev) => prev - 1);
        },
        [tempAddIndex, setExistingTimeslots]
    );

    const modifyTimeslot = useCallback(
        (timeslotId: number, newTimeslotProps: ModifyTimeslotParams) => {
            const session = existingTimeslots.get(timeslotId);
            if (!session) {
                return;
            }
            if (timeslotId > 0 && session.type === ModificationType.UNCHANGED) {
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

    const removeTimeslot = useCallback(
        (timeslotId) => {
            // Added timeslot
            if (timeslotId < 0) {
                setExistingTimeslots((prev) => prev.remove(timeslotId));
            } else {
                const timeslot = existingTimeslots.get(timeslotId);
                if (!timeslot) {
                    return;
                }
                setExistingTimeslots((prev) =>
                    prev.set(timeslotId, {
                        ...timeslot,
                        type:
                            timeslot.type === ModificationType.UNCHANGED
                                ? ModificationType.REMOVED
                                : ModificationType.REMOVED_MODIFIED,
                    })
                );
                setTempRemovedTimeslots((prev) => prev.add(timeslotId));
            }
        },
        [existingTimeslots, setExistingTimeslots, setTempRemovedTimeslots]
    );

    const restoreTimeslot = useCallback(
        (timeslotId) => {
            if (!tempRemovedTimeslots.contains(timeslotId)) {
                return;
            }
            const timeslot = existingTimeslots.get(timeslotId);
            if (!timeslot) {
                return;
            }
            tempRemovedTimeslots.remove(timeslotId);
            setExistingTimeslots((prev) =>
                prev.set(timeslotId, {
                    ...timeslot,
                    type:
                        timeslot.type === ModificationType.REMOVED
                            ? ModificationType.UNCHANGED
                            : ModificationType.MODIFIED,
                })
            );
        },
        [existingTimeslots, setExistingTimeslots, tempRemovedTimeslots]
    );

    const editSession = useCallback(
        (timeslotId) => {
            setEditedSessionId(timeslotId);
            openModal();
        },
        [openModal]
    );

    return (
        <>
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
                                              ?.type ||
                                          ModificationType.UNCHANGED
                                }
                                updateSession={modifyTimeslot}
                                removeSession={removeTimeslot}
                                restoreSession={restoreTimeslot}
                                editSession={editSession}
                            />
                        )}
                        key={key}
                    />
                )}
                sessions={sessions}
            />
            <TimeslotModal
                isOpen={isModalOpen}
                close={closeModal}
                timeslot={existingTimeslots.get(editedSessionId)}
                updateTimeslot={modifyTimeslot}
            />
        </>
    );
};