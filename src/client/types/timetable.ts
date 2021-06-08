import { IsoDay } from "../../types/date";
import { Set } from "immutable";
import { Dispatch, SetStateAction } from "react";

export type TimetableSessionType = {
    id: string;
    name: string;
    startTime: number;
    endTime: number;
    day: IsoDay;
};

export type TimetableState = {
    chosenWeek: number;
    chosenCourses: Set<string>;
    chosenTermId: string;
    chooseWeek: Dispatch<SetStateAction<number>>;
    setChosenCourses: Dispatch<SetStateAction<Set<string>>>;
    chooseTerm: Dispatch<SetStateAction<string>>;
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
