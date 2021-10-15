import React, { useCallback, useMemo, useState } from "react";
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
    dateFormat?: string;
    initialMonth?: number;
    initialYear?: number;
};

export const CalendarCore: React.FC<Props> = ({
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
    dateFormat = "MMM yyyy",
    initialMonth,
    initialYear,
}) => {
    const {
        month,
        year,
        setCalendarTime,
        setYear,
        setMonth,
        goPreviousMonth,
        goNextMonth,
    } = useCalendarTime(initialMonth, initialYear);
    const [viewMode, setViewMode] = useState<"days" | "months" | "years">(
        "months"
    );
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
    return (
        <VStack
            w={96}
            borderRadius={6}
            boxShadow={`0px 0px 3px 1px ${glowColour}`}
            m={2}
            padding={3}
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
                        goPreviousMonth();
                    }}
                    isRound
                    disabled={
                        month === firstDate?.getMonth() &&
                        year === firstDate?.getFullYear()
                    }
                />
                <Box flex={1} textAlign="center" fontSize="md">
                    {format(viewedDate, dateFormat)}
                </Box>
                <IconButton
                    aria-label="next-month"
                    icon={<BsChevronRight />}
                    variant="ghost"
                    onClick={() => {
                        goNextMonth();
                    }}
                    isRound
                    disabled={
                        month === lastDate?.getMonth() &&
                        year === lastDate?.getFullYear()
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
            {viewMode === "days" ? (
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
            ) : viewMode === "months" ? (
                <CalendarMonthsView viewedYear={year} setViewedYear={setYear} />
            ) : null}
        </VStack>
    );
};
