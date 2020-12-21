import React, { useContext, useEffect } from "react";
import { SessionType, Timetable } from "../components/timetable/Timetable";
import { Day } from "../components/timetable/Day";
import { TimeSlot } from "../components/timetable/TimeSlot";
import {
    Props as SessionProps,
    Session,
} from "../components/timetable/Session";
import { useTermsQuery } from "../generated/graphql";
import { IsoDay } from "../../types/date";

type Props = {};

export const TimetableContainer: React.FC<Props> = () => {
    const { data } = useTermsQuery();
    useEffect(() => {
        console.log(data);
    }, [data]);
    // const { displayedDays } = useContext<TimetableState>(TimetableContext);
    const sessions: Array<SessionType> = [
        // TODO: hardcoded query.ts
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
    const displayedDays: IsoDay[] = [1, 2, 3, 4, 5, 6, 7];
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
