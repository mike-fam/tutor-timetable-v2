export enum IsoDay {
    Mon = 1,
    Tue = 2,
    Wed = 3,
    Thu = 4,
    Fri = 5,
    Sat = 6,
    Sun = 7,
}

export type IsoDayFormatting =
    | "i"
    | "io"
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
    stackIndex: number;
};
