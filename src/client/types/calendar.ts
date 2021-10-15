export type CalendarMonth = {
    month: number;
    year: number;
};

export type CalendarDay = CalendarMonth & {
    day: number;
};
