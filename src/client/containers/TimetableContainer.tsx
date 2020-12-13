import React from "react";
import { SessionType, Timetable } from "../components/timetable/Timetable";
import { IsoDay } from "../../types/date";
import { Day } from "../components/timetable/Day";
import { TimeSlot } from "../components/timetable/TimeSlot";
import {
    Props as SessionProps,
    Session,
} from "../components/timetable/Session";

type Props = {};

export const TimetableContainer: React.FC<Props> = () => {
    const sessions: Array<SessionType> = [
        // TODO: hardcoded sessions
        {
            id: "1",
            startTime: 8,
            endTime: 10,
            day: 1,
            name: "P01",
        },
        {
            id: "2",
            startTime: 13,
            endTime: 14,
            day: 2,
            name: "T01",
        },
        {
            id: "3",
            startTime: 18,
            endTime: 22,
            day: 3,
            name: "Exam after hours",
        },
        {
            id: "4",
            startTime: 10,
            endTime: 11.5,
            day: 3,
            name: "Meeting",
        },
        {
            id: "5",
            startTime: 10.25,
            endTime: 11.8,
            day: 3,
            name: "Clashed",
        },
    ];
    const displayedDays: Array<IsoDay> = [
        IsoDay.MON,
        IsoDay.TUE,
        IsoDay.WED,
        IsoDay.THU,
        IsoDay.FRI,
        IsoDay.SAT,
        IsoDay.SUN,
    ];
    return (
        <Timetable
            sessions={sessions}
            displayedDays={displayedDays}
            renderDay={(dayProps, key) => (
                <Day
                    {...dayProps}
                    renderTimeSlot={(key) => <TimeSlot key={key} />}
                    renderSession={(sessionProps: SessionProps, key) => (
                        <Session {...sessionProps} key={key} />
                    )}
                    key={key}
                />
            )}
        />
    );
};
