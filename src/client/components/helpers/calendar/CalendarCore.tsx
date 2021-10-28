import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
    Box,
    Divider,
    Flex,
    IconButton,
    theme,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import format from "date-fns/format";
import {
    BsChevronDoubleLeft,
    BsChevronDoubleRight,
    BsChevronLeft,
    BsChevronRight,
} from "react-icons/all";
import { CalendarDaysView } from "./CalendarDaysView";
import { CalendarMonthsView } from "./CalendarMonthsView";
import { useCalendarTime } from "../../../hooks/useCalendarTime";
import { CalendarYearsView } from "./CalendarYearsView";

type Props = {
    firstDate?: Date;
    lastDate?: Date;
    disableBefore?: Date;
    disableAfter?: Date;
    disabledDays?: Date[];
    selectedDays: Date[];
    selectedDateRanges?: [Date, Date][];
    onDateClick: (date: Date) => void;
    onDateMouseOver?: (date: Date) => void;
    onDateMouseLeave?: (date: Date) => void;
    onCalendarMouseLeave?: () => void;
    initialMonth?: number;
    initialYear?: number;
};

export type CalendarViewMode = "days" | "months" | "years";

export const CalendarCore = forwardRef<HTMLDivElement, Props>(
    (
        {
            firstDate,
            lastDate,
            disableBefore,
            disableAfter,
            disabledDays,
            selectedDays,
            selectedDateRanges,
            onDateClick,
            onDateMouseOver = () => {},
            onDateMouseLeave = () => {},
            onCalendarMouseLeave = () => {},
            initialMonth,
            initialYear,
        },
        ref
    ) => {
        const {
            month,
            year,
            setCalendarTime,
            setYear,
            setMonth,
            goPreviousMonth,
            goNextMonth,
        } = useCalendarTime(initialMonth, initialYear);
        const [viewMode, setViewMode] = useState<CalendarViewMode>("days");
        const viewedDate = useMemo(() => new Date(year, month), [year, month]);
        const glowColour = useColorModeValue(
            theme.colors.blue["300"],
            theme.colors.blue["700"]
        );
        const jumpToFirstDate = useCallback(() => {
            if (firstDate) {
                setCalendarTime({
                    month: firstDate.getMonth(),
                    year: firstDate.getFullYear(),
                });
            }
        }, [firstDate, setCalendarTime]);
        const jumpToLastDate = useCallback(() => {
            if (lastDate) {
                setCalendarTime({
                    month: lastDate.getMonth(),
                    year: lastDate.getFullYear(),
                });
            }
        }, [lastDate, setCalendarTime]);
        const setNextView = useCallback(() => {
            switch (viewMode) {
                case "days":
                    setViewMode("months");
                    break;
                case "months":
                    setViewMode("years");
                    break;
            }
        }, [viewMode]);
        const dateTitle = useMemo(() => {
            switch (viewMode) {
                case "days":
                    return format(viewedDate, "MMM yyyy");
                case "months":
                    return format(viewedDate, "yyyy");
                case "years":
                    return "Choose year:";
            }
        }, [viewedDate, viewMode]);
        const calendarView = useMemo(() => {
            switch (viewMode) {
                case "days":
                    return (
                        <CalendarDaysView
                            onDateClick={onDateClick}
                            onDateMouseLeave={onDateMouseLeave}
                            onDateMouseOver={onDateMouseOver}
                            viewedMonth={{ month, year }}
                            selectedDays={selectedDays}
                            selectedDateRanges={selectedDateRanges}
                            firstDate={firstDate}
                            lastDate={lastDate}
                            disableBefore={disableBefore}
                            disableAfter={disableAfter}
                            disabledDays={disabledDays}
                        />
                    );
                case "months":
                    return (
                        <CalendarMonthsView
                            viewedYear={year}
                            setViewedMonth={(month) => {
                                setMonth(month);
                                setViewMode("days");
                            }}
                            firstDate={firstDate}
                            lastDate={lastDate}
                            disableBefore={disableBefore}
                            disableAfter={disableAfter}
                        />
                    );
                case "years":
                    return (
                        <CalendarYearsView
                            viewedYear={year}
                            setViewedYear={(year) => {
                                setYear(year);
                                setViewMode("months");
                            }}
                            firstDate={firstDate}
                            lastDate={lastDate}
                            disableBefore={disableBefore}
                            disableAfter={disableAfter}
                        />
                    );
            }
        }, [
            disableAfter,
            disableBefore,
            disabledDays,
            firstDate,
            lastDate,
            month,
            onDateClick,
            onDateMouseLeave,
            onDateMouseOver,
            selectedDateRanges,
            selectedDays,
            setMonth,
            setYear,
            viewMode,
            year,
        ]);
        const hoverColour = useColorModeValue("gray.200", "gray.600");
        const bgColour = useColorModeValue("white", "gray.800");
        return (
            <VStack
                w={96}
                borderRadius={6}
                boxShadow={`0px 0px 3px 1px ${glowColour}`}
                m={2}
                padding={3}
                ref={ref}
                bg={bgColour}
            >
                <Flex alignItems="center" w="100%">
                    <IconButton
                        aria-label="first-month"
                        icon={<BsChevronDoubleLeft />}
                        variant="ghost"
                        onClick={() => {
                            jumpToFirstDate();
                        }}
                        isRound
                        visibility={firstDate ? "visible" : "hidden"}
                    />
                    <IconButton
                        aria-label="previous-month"
                        icon={<BsChevronLeft />}
                        variant="ghost"
                        onClick={() => {
                            switch (viewMode) {
                                case "days":
                                    goPreviousMonth();
                                    break;
                                case "months":
                                    setYear((prev) => prev - 1);
                                    break;
                                case "years":
                                    setYear((prev) => prev - 12);
                            }
                        }}
                        isRound
                        disabled={
                            !!firstDate &&
                            (viewMode === "days"
                                ? month === firstDate.getMonth() &&
                                  year === firstDate.getFullYear()
                                : viewMode === "months"
                                ? year <= firstDate.getFullYear()
                                : year - 5 < firstDate.getFullYear())
                        }
                    />
                    <Box
                        flex={1}
                        textAlign="center"
                        fontSize="md"
                        _hover={{ bg: hoverColour, cursor: "pointer" }}
                        onClick={() => setNextView()}
                        h={10}
                        lineHeight={10}
                        borderRadius={4}
                    >
                        {dateTitle}
                    </Box>
                    <IconButton
                        aria-label="next-month"
                        icon={<BsChevronRight />}
                        variant="ghost"
                        onClick={() => {
                            switch (viewMode) {
                                case "days":
                                    goNextMonth();
                                    break;
                                case "months":
                                    setYear((prev) => prev + 1);
                                    break;
                                case "years":
                                    setYear((prev) => prev + 12);
                            }
                        }}
                        isRound
                        disabled={
                            !!lastDate &&
                            (viewMode === "days"
                                ? month === lastDate.getMonth() &&
                                  year === lastDate.getFullYear()
                                : viewMode === "months"
                                ? year >= lastDate.getFullYear()
                                : year + 8 > lastDate.getFullYear())
                        }
                    />
                    <IconButton
                        aria-label="last-month"
                        icon={<BsChevronDoubleRight />}
                        variant="ghost"
                        onClick={() => {
                            jumpToLastDate();
                        }}
                        isRound
                        visibility={firstDate ? "visible" : "hidden"}
                    />
                </Flex>
                <Divider />
                <Box w="100%" onMouseLeave={onCalendarMouseLeave}>
                    {calendarView}
                </Box>
            </VStack>
        );
    }
);
