import { IsoDay } from "../../types/date";
import { Set } from "immutable";
import { Dispatch, SetStateAction } from "react";

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
    chooseWeek: Dispatch<SetStateAction<number>>;
    setChosenCourses: Dispatch<SetStateAction<Set<number>>>;
    chooseTerm: Dispatch<SetStateAction<number>>;
};

export type TimetableSettings = {
    displayedDays: Array<IsoDay>;
    setDisplayedDays: Dispatch<SetStateAction<Array<IsoDay>>>;
    dayStartTime: number;
    setDayStartTime: Dispatch<SetStateAction<number>>;
    dayEndTime: number;
    setDayEndTime: Dispatch<SetStateAction<number>>;
    displayMySessionsOnly: boolean;
    setDisplayMySessionsOnly: Dispatch<SetStateAction<boolean>>;
};

export enum TimetableDisplayMode {
    ME = "Me",
    ALL = "All",
}
