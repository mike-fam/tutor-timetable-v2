import React, { useState } from "react";
import { IsoDay } from "../../types/date";
import { TimetableContext } from "../utils/timetable";

type Props = {};

export const TimetablePageContainer: React.FC<Props> = ({}) => {
    const [week, setWeek] = useState<number>(1);
    const [courses, setCourses] = useState<Array<string>>([]);
    const [term, setTerm] = useState<string>("");
    let displayedDays: Array<IsoDay>,
        setDisplayedDays: (
            value: ((prevState: Array<IsoDay>) => Array<IsoDay>) | Array<IsoDay>
        ) => void;
    [displayedDays, setDisplayedDays] = useState<Array<IsoDay>>([
        IsoDay.Mon,
        IsoDay.Tue,
        IsoDay.Wed,
        IsoDay.Thu,
        IsoDay.Fri,
        IsoDay.Sat,
        IsoDay.Sun,
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
