import React, { useCallback, useContext, useState } from "react";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { Set } from "immutable";
import {
    RequestSession,
    RequestSessionProps,
} from "../../components/requests/RequestSession";
import { SessionTheme } from "../../types/timetable";

type Props = {
    chosenCourse: number;
    chosenTerm: number;
};

// TODO: display sessions that user can choose
// 	no sessions that user is assigned to
//		warning on sessions that user is not available on
// TODO: session can be clicked on. Multiple sessions can be chosen

export const RequestTimetableContainer: React.FC<Props> = ({
    chosenTerm,
    chosenCourse,
}) => {
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    const [chosenSessions, setChosenSessions] = useState<Set<number>>(Set());
    const addSession = useCallback((sessionId) => {
        setChosenSessions((prev) => prev.add(sessionId));
    }, []);
    const unaddSession = useCallback((sessionId) => {
        setChosenSessions((prev) => prev.remove(sessionId));
    }, []);
    return (
        <Timetable
            displayedDays={displayedDays}
            sessions={[]} // TODO: change
            startTime={dayStartTime}
            endTime={dayEndTime}
            renderDay={(dayProps, key) => (
                <Day
                    {...dayProps}
                    renderSession={(
                        sessionProps,
                        key,
                        moreProps: RequestSessionProps
                    ) => (
                        <RequestSession
                            {...sessionProps}
                            key={key}
                            {...moreProps}
                        />
                    )}
                    key={key}
                    renderTimeSlot={(key) => <TimeSlot key={key} />}
                    getSessionProps={(sessionId) => ({
                        onClick: chosenSessions.includes(sessionId)
                            ? addSession
                            : unaddSession,
                        theme: SessionTheme.PRIMARY, // TODO: change
                    })}
                />
            )}
        />
    );
};
