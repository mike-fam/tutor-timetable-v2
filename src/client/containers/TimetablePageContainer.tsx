import React, { useState } from "react";
import { IsoDay } from "../../types/date";
import { TimetableContext } from "../utils/timetable";

type Props = {};

export const TimetablePageContainer: React.FC<Props> = ({}) => {
    const [week, setWeek] = useState<number>(1);
    const [courses, setCourses] = useState<Array<string>>([]);
    const [term, setTerm] = useState<string>("");
    const [displayedDays, setDisplayedDays] = useState<Array<IsoDay>>([
        IsoDay.MON,
        IsoDay.TUE,
        IsoDay.WED,
        IsoDay.THU,
        IsoDay.FRI,
        IsoDay.SAT,
        IsoDay.SUN,
    ]);
    return (
        <TimetableContext.Provider
            value={{
                week,
                courses,
                term,
                displayedDays,
                setWeek,
                setCourses,
                setTerm,
                setDisplayedDays,
            }}
        ></TimetableContext.Provider>
    );
};
