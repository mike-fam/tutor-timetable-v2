import React, { useContext, useState } from "react";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { Set } from "immutable";

type Props = {};

// TODO: display sessions that user can choose
// 	no sessions that user is assigned to
//		warning on sessions that user is not available on
// TODO: session can be clicked on. Multiple sessions can be chosen

export const RequestTimetableContainer: React.FC<Props> = ({}) => {
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    const [chosenSessions, setChosenSessions] = useState<Set<number>>(Set());
    return (
        <Timetable
            displayedDays={displayedDays}
            sessions={[]}
            startTime={dayStartTime}
            endTime={dayEndTime}
            renderDay={(dayProps, key) => (
                <Day
                    {...dayProps}
                    renderSession={() => <div>Test</div>}
                    key={key}
                    renderTimeSlot={(key) => <TimeSlot key={key} />}
                    getSessionProps={() => {}}
                />
            )}
        />
    );
};
