import { IsoDay } from "../../types/date";
import { Set } from "immutable";
import React from "react";

export type TimetableSessionType = {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    day: IsoDay;
};

export type TimetableState = {
    chosenWeek: number;
    chosenCourses: Set<number>;
    chosenTermId: number;
    chooseWeek: React.Dispatch<React.SetStateAction<number>>;
    setChosenCourses: React.Dispatch<React.SetStateAction<Set<number>>>;
    chooseTerm: React.Dispatch<React.SetStateAction<number>>;
};

export type TimetableSettings = {
    displayedDays: Set<IsoDay>;
    setDisplayedDays: React.Dispatch<React.SetStateAction<Set<IsoDay>>>;
    dayStartTime: number;
    setDayStartTime: React.Dispatch<React.SetStateAction<number>>;
    dayEndTime: number;
    setDayEndTime: React.Dispatch<React.SetStateAction<number>>;
};

export enum SessionTheme {
    SUCCESS,
    ERROR,
    WARNING,
    PRIMARY,
}
