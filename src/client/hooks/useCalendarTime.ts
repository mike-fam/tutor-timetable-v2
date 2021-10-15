import { useCallback, useState } from "react";
import { today } from "../constants/date";
import { CalendarMonth } from "../types/calendar";

export const useCalendarTime = (
    initialMonth?: number,
    initialYear?: number
) => {
    const [month, setMonth] = useState(initialMonth || today.getMonth());
    const [year, setYear] = useState(initialYear || today.getFullYear());
    const setCalendarTime = useCallback(({ month, year }: CalendarMonth) => {
        setMonth(month);
        setYear(year);
    }, []);
    const goPreviousMonth = useCallback(() => {
        setYear((prev) => (month === 0 ? prev - 1 : prev));
        setMonth((prev) => (prev - 1 + 12) % 12);
    }, [month]);
    const goNextMonth = useCallback(() => {
        setYear((prev) => (month === 11 ? prev + 1 : prev));
        setMonth((prev) => (prev + 1) % 12);
    }, [month]);
    return {
        month,
        year,
        setMonth,
        setYear,
        setCalendarTime,
        goPreviousMonth,
        goNextMonth,
    };
};
