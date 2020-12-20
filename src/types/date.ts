import { registerEnumType } from "type-graphql";

export enum IsoDay {
    Mon = 1,
    Tue = 2,
    Wed = 3,
    Thu = 4,
    Fri = 5,
    Sat = 6,
    Sun = 7,
}

registerEnumType(IsoDay, {
    name: "IsoDay",
});

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
