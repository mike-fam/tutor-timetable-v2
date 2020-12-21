import React, { useState } from "react";
import { IsoDay } from "../../types/date";
import { TimetableContext } from "../utils/timetable";
import { Map } from "immutable";

type Props = {};

export const TimetablePageContainer: React.FC<Props> = ({}) => {
    const [week, setWeek] = useState<number>(1);
    const [courses, setCourses] = useState<Array<string>>([]);
    const [terms, setTerm] = useState<Map<string, string>>(Map());
    const chosenTerm = "test";
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
                chosenTerm,
                week,
                courses,
                terms,
                displayedDays,
                setWeek,
                setCourses,
                setTerm,
                setDisplayedDays,
            }}
        >
            test
        </TimetableContext.Provider>
    );
};
