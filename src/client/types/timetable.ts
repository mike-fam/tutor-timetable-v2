import { IsoDay } from "../../types/date";
import React from "react";
import { Set } from "immutable";

export type TimetableState = {
    chosenWeek: number;
    courseIds: Set<number>;
    terms: Set<number>;
    chosenTerm: number;
    displayedDays: Set<IsoDay>;
    chooseWeek: React.Dispatch<React.SetStateAction<number>>;
    setCourses: React.Dispatch<React.SetStateAction<Set<number>>>;
    chooseTerm: React.Dispatch<React.SetStateAction<number>>;
    setDisplayedDays: React.Dispatch<React.SetStateAction<Set<IsoDay>>>;
};
