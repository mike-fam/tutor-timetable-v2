import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Timetable } from "../../components/timetable/Timetable";
import { Day } from "../../components/timetable/Day";
import { Props as SessionProps } from "../../components/timetable/Session";
import { ClickableTimeslot } from "../../components/timetable/ClickableTimeslot";
import { TimetableSettingsContext } from "../../utils/timetable";
import { AvailabilityContext } from "../../utils/availability";
import { ModifyTimeslotParams, TempTimeslot } from "../../types/availability";
import {
    AvailabilitySession,
    AvailabilityCustomSessionProps,
} from "../../components/availabilities/AvailabilitySession";
import { useDisclosure } from "@chakra-ui/react";
import { useQueryWithError } from "../../hooks/useApolloHooksWithError";
import {
    ModificationType,
    useMyAvailabilityQuery,
} from "../../generated/graphql";
import { TimeslotModal } from "../../components/availabilities/TimeslotModal";
import { isNumeric } from "../../../utils/string";
import { defaultInt, defaultStr } from "../../constants";

type Props = {};

export const AvailabilityTimetableContainer: React.FC<Props> = () => {
    // Timetable settings stuff
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    // Generate ids for added timeslots
    const [tempAddIndex, setTempAddIndex] = useState(defaultInt);

    // Availability state and handlers
    const { timeslots, setTimeslots } = useContext(AvailabilityContext);

    // Modal stuff
    const {
        isOpen: isModalOpen,
        onClose: closeModal,
        onOpen: openModal,
    } = useDisclosure();
    const [editedSessionId, setEditedSessionId] = useState(defaultStr);

    const { data: myTimeslots, loading } = useQueryWithError(
        useMyAvailabilityQuery,
        {}
    );

    useEffect(() => {
        if (loading || !myTimeslots) {
            return;
        }
        myTimeslots.myAvailability.forEach((timeslot) => {
            setTimeslots((prev) =>
                prev.set(timeslot.id, {
                    ...timeslot,
                    modificationType: ModificationType.Unchanged,
                })
            );
        });
    }, [setTimeslots, loading, myTimeslots]);

    const sessions = useMemo(() => {
        return timeslots.toArray().map(([id, timeslot]) => ({
            ...timeslot,
            id,
            name: "", // Just to be typesafe
        }));
    }, [timeslots]);

    const addTempTimeslot = useCallback(
        (timeslot: Omit<TempTimeslot, "id">) => {
            setTimeslots((prev) =>
                prev.set(String(tempAddIndex), {
                    ...timeslot,
                    id: String(tempAddIndex),
                    modificationType: ModificationType.Added,
                })
            );
            setTempAddIndex((prev) => prev + 1);
        },
        [tempAddIndex, setTimeslots]
    );

    const modifySession = useCallback(
        (timeslotId: string, newTimeslotProps: ModifyTimeslotParams) => {
            const session = timeslots.get(timeslotId);
            if (!session) {
                return;
            }
            if (
                !isNumeric(timeslotId) &&
                session.modificationType === ModificationType.Unchanged
            ) {
                setTimeslots((prev) =>
                    prev.set(timeslotId, {
                        ...session,
                        ...newTimeslotProps,
                        modificationType: ModificationType.Modified,
                    })
                );
            } else {
                setTimeslots((prev) =>
                    prev.set(timeslotId, {
                        ...session,
                        ...newTimeslotProps,
                    })
                );
            }
        },
        [timeslots, setTimeslots]
    );

    const removeSession = useCallback(
        (timeslotId) => {
            // Added timeslot
            if (timeslotId < 0) {
                setTimeslots((prev) => prev.remove(timeslotId));
            } else {
                const timeslot = timeslots.get(timeslotId);
                if (!timeslot) {
                    return;
                }
                setTimeslots((prev) =>
                    prev.set(timeslotId, {
                        ...timeslot,
                        modificationType:
                            timeslot.modificationType ===
                            ModificationType.Unchanged
                                ? ModificationType.Removed
                                : ModificationType.RemovedModified,
                    })
                );
            }
        },
        [timeslots, setTimeslots]
    );

    const restoreSession = useCallback(
        (timeslotId) => {
            const timeslot = timeslots.get(timeslotId);
            if (!timeslot) {
                return;
            }
            setTimeslots((prev) =>
                prev.set(timeslotId, {
                    ...timeslot,
                    modificationType:
                        timeslot.modificationType === ModificationType.Removed
                            ? ModificationType.Unchanged
                            : ModificationType.Modified,
                })
            );
        },
        [timeslots, setTimeslots]
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
                    <Day<AvailabilityCustomSessionProps>
                        {...dayProps}
                        renderTimeSlot={(key, time, day) => (
                            <ClickableTimeslot
                                key={key}
                                time={time}
                                day={day}
                                addNewTimeslot={addTempTimeslot}
                            />
                        )}
                        renderSession={(sessionProps, key) => (
                            <AvailabilitySession
                                {...sessionProps}
                                key={key}
                                custom={(sessionId: string) => ({
                                    updateSession: modifySession,
                                    removeSession,
                                    restoreSession,
                                    editSession,
                                    modificationType: isNumeric(sessionId)
                                        ? ModificationType.Added
                                        : timeslots.get(sessionId)
                                              ?.modificationType ||
                                          ModificationType.Unchanged,
                                })}
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
                timeslot={timeslots.get(editedSessionId)}
                updateTimeslot={modifySession}
            />
        </>
    );
};
