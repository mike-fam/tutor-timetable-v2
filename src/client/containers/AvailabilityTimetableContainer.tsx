import React from "react";
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

type Props = {};

export const AvailabilityTimetableContainer: React.FC<Props> = ({}) => {
    const displayedDays = Set([
        IsoDay.MON,
        IsoDay.TUE,
        IsoDay.WED,
        IsoDay.THU,
        IsoDay.FRI,
        IsoDay.SAT,
        IsoDay.SUN,
    ]);
    const sessions: TimetableSession[] = [];
    return (
        <Timetable
            displayedDays={displayedDays}
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
