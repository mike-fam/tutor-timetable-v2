import React, { useCallback, useMemo } from "react";
import { Box, Grid } from "@chakra-ui/react";
import range from "lodash/range";
import differenceInDays from "date-fns/differenceInDays";
import addDays from "date-fns/addDays";
import { CalendarDay } from "./CalendarDay";
import isSameDay from "date-fns/isSameDay";
import { today } from "../../../constants/date";
import startOfISOWeek from "date-fns/startOfISOWeek";
import endOfISOWeek from "date-fns/endOfISOWeek";
import endOfMonth from "date-fns/endOfMonth";
import startOfDay from "date-fns/startOfDay";
import { CalendarMonth } from "../../../types/calendar";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";

type Props = {
    firstDate?: Date;
    lastDate?: Date;
    disableBefore?: Date;
    disableAfter?: Date;
    viewedMonth: CalendarMonth;
    disabledDays?: Date[];
    selectedDays: Date[];
    selectedDateRanges?: [Date, Date][];
    onDateClick: (date: Date) => void;
    onDateMouseOver?: (date: Date) => void;
    onDateMouseLeave?: (date: Date) => void;
};

export const CalendarDaysView: React.FC<Props> = ({
    firstDate,
    lastDate,
    disableAfter,
    disableBefore,
    disabledDays,
    viewedMonth,
    selectedDays,
    selectedDateRanges,
    onDateClick,
    onDateMouseOver = () => {},
    onDateMouseLeave = () => {},
}) => {
    const sanitisedFirstDate = useMemo(
        () => firstDate && startOfDay(firstDate),
        [firstDate]
    );
    const sanitisedLastDate = useMemo(
        () => lastDate && startOfDay(lastDate),
        [lastDate]
    );
    const sanitisedDisabledBefore = useMemo(
        () => disableBefore && startOfDay(disableBefore),
        [disableBefore]
    );
    const sanitisedDisabledAfter = useMemo(
        () => disableAfter && startOfDay(disableAfter),
        [disableAfter]
    );
    const viewedDate = useMemo(
        () => new Date(viewedMonth.year, viewedMonth.month),
        [viewedMonth]
    );
    const firstDateInRange = useMemo(
        () => startOfISOWeek(viewedDate),
        [viewedDate]
    );
    const lastDateInRange = useMemo(
        () => addDays(endOfISOWeek(endOfMonth(viewedDate)), 1),
        [viewedDate]
    );
    const isDayDisabled = useCallback(
        (date: Date) => {
            date = startOfDay(date);
            if (
                sanitisedDisabledBefore &&
                isBefore(date, sanitisedDisabledBefore)
            ) {
                return true;
            } else if (
                sanitisedDisabledAfter &&
                isAfter(date, sanitisedDisabledAfter)
            ) {
                return true;
            } else if (
                sanitisedFirstDate &&
                isBefore(date, sanitisedFirstDate)
            ) {
                return true;
            } else if (sanitisedLastDate && isAfter(date, sanitisedLastDate)) {
                return true;
            } else if (disabledDays) {
                for (const disabledDay of disabledDays) {
                    if (isSameDay(disabledDay, date)) {
                        return true;
                    }
                }
            }
            return false;
        },
        [
            sanitisedDisabledBefore,
            sanitisedDisabledAfter,
            sanitisedFirstDate,
            sanitisedLastDate,
            disabledDays,
        ]
    );
    const isDaySelected = useCallback(
        (day: Date) => {
            // TODO: Store timestamp in set to improve efficiency. Currently runs
            //  in quadratic time
            for (const selectedDay of selectedDays) {
                if (isSameDay(selectedDay, day)) {
                    return true;
                }
            }
            if (!selectedDateRanges) {
                return false;
            }
            for (const [firstDate, lastDate] of selectedDateRanges) {
                if (isSameDay(firstDate, day)) {
                    return true;
                }
                if (isSameDay(lastDate, day)) {
                    return true;
                }
            }
            return false;
        },
        [selectedDays, selectedDateRanges]
    );
    const isDaySubSelected = useCallback(
        (day: Date) => {
            if (!selectedDateRanges) {
                return false;
            }
            for (const [firstDate, lastDate] of selectedDateRanges) {
                if (isAfter(day, firstDate) && isBefore(day, lastDate)) {
                    return true;
                }
            }
            return false;
        },
        [selectedDateRanges]
    );
    return (
        <Grid templateColumns="repeat(7, 1fr)" w="100%" rowGap={1}>
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <Box
                    fontSize="sm"
                    color="gray"
                    textAlign="center"
                    fontWeight="bold"
                    mb={4}
                    key={day}
                >
                    {day}
                </Box>
            ))}
            {range(differenceInDays(lastDateInRange, firstDateInRange)).map(
                (dayIndex) => {
                    const day = addDays(firstDateInRange, dayIndex);
                    return (
                        <CalendarDay
                            day={day.getDate()}
                            currentMonth={viewedMonth.month === day.getMonth()}
                            key={day.toISOString()}
                            bold={isSameDay(today, day)}
                            onClick={() => onDateClick(day)}
                            onMouseOver={() => {
                                onDateMouseOver(day);
                            }}
                            onMouseLeave={() => {
                                onDateMouseLeave(day);
                            }}
                            disabled={isDayDisabled(day)}
                            selected={isDaySelected(day)}
                            subSelected={isDaySubSelected(day)}
                        />
                    );
                }
            )}
        </Grid>
    );
};
