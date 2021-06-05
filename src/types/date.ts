export enum IsoDay {
    MON = 1,
    TUE = 2,
    WED = 3,
    THU = 4,
    FRI = 5,
    SAT = 6,
    SUN = 7,
}

export type IsoDayFormatting =
    | "i"
    | "ii"
    | "ii"
    | "iii"
    | "iiii"
    | "iiiii"
    | "iiiiii";

export type TimeRange = {
    id: number;
    start: number;
    end: number;
};

export type StackInfo = {
    stackSize: number;
    longestBranchSize: number;
    splitBranchSize: number;
    elemStackStart: number;
    elemStackWidth: number;
    elemStackIndex: number;
};
