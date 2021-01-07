import React, { useContext } from "react";
import { Timetable } from "../components/timetable/Timetable";
import { IsoDay } from "../../types/date";
import { Set } from "immutable";
import { Day } from "../components/timetable/Day";
import { TimetableSession } from "../types/timetable";
import {
    Props as SessionProps,
    Session,
} from "../components/timetable/Session";
import { AvailabilityTimeSlot } from "../components/availabilities/AvailabilityTimeSlot";
import { TimetableSettingsContext } from "../utils/timetable";

type Props = {};

export const AvailabilityTimetableContainer: React.FC<Props> = ({}) => {
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    const sessions: TimetableSession[] = [];
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
                            onClick={() => console.log(time, day)}
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
