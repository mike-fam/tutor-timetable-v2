import { IsoDay } from "../../types/date";
import React from "react";
import { Map } from "immutable";

export type TimetableState = {
    week: number;
    courses: Array<string>;
    terms: Map<string, string>;
    chosenTerm: string;
    displayedDays: Array<IsoDay>;
    setWeek: React.Dispatch<React.SetStateAction<number>>;
    setCourses: React.Dispatch<React.SetStateAction<Array<string>>>;
    setTerm: React.Dispatch<React.SetStateAction<Map<string, string>>>;
    setDisplayedDays: React.Dispatch<React.SetStateAction<Array<IsoDay>>>;
};
