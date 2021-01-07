import { IsoDay } from "../../types/date";

export type TimetableSession = {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    day: IsoDay;
};
