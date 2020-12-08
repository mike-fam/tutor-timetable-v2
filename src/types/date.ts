export type IsoDayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type IsoDayFormatting =
    | "i"
    | "io"
    | "ii"
    | "iii"
    | "iiii"
    | "iiiii"
    | "iiiiii";

export type TimeRange = {
    id: string;
    start: number;
    end: number;
};

export type StackInfo = {
    stackSize: number;
    stackIndex: number;
};
