import { IsoDay } from "../../types/date";
import React from "react";

export type TimetableState = {
    week: number;
    courses: Array<string>;
    term: string;
    displayedDays: Array<IsoDay>;
    changeWeek: React.Dispatch<React.SetStateAction<number>>;
    changeCourses: React.Dispatch<React.SetStateAction<string>>;
    changeTerm: React.Dispatch<React.SetStateAction<string>>;
    changeDisplayedDays: React.Dispatch<
        React.SetStateAction<Array<IsoDay>>
    >;
};
