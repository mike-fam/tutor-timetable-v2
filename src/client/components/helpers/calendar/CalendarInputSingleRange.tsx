import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Box,
    HStack,
    Input,
    InputProps,
    useDisclosure,
    useOutsideClick,
    usePopper,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { CalendarCore } from "./CalendarCore";
import isBefore from "date-fns/isBefore";
import endOfISOWeek from "date-fns/endOfISOWeek";
import startOfISOWeek from "date-fns/startOfISOWeek";
import { today } from "../../../constants/date";
import isSameDay from "date-fns/isSameDay";
import differenceInCalendarISOWeeks from "date-fns/differenceInCalendarISOWeeks";
import { isDateValid } from "../../../../utils/date";

export type Props = Omit<InputProps, "value" | "onChange"> & {
    dateFormat?: string;
    value: [Date?, Date?];
    onChange: (dateRange: [Date, Date]) => void;
    firstDate?: Date;
    lastDate?: Date;
    disableBefore?: Date;
    disableAfter?: Date;
    disabledDays?: Date[];
    wholeWeeksOnly?: boolean;
};

export const CalendarInputSingleRange: React.FC<Props> = ({
    dateFormat = "dd/MM/yyyy",
    value,
    onChange,
    firstDate,
    lastDate,
    disableBefore,
    disableAfter,
    disabledDays,
    wholeWeeksOnly = false,
}) => {
    const [from, to] = value;
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { popperRef, referenceRef } = usePopper({
        placement: "bottom-start",
    });
    const calendarRef = useRef<HTMLDivElement>(null);
    useOutsideClick({ ref: calendarRef, handler: onClose });
    const [start, setStart] = useState<Date | undefined>(from);
    const [end, setEnd] = useState<Date | undefined>(to);
    const [endPreview, setEndPreview] = useState<Date>();
    const onDateMouseOver = useCallback(
        (date: Date) => {
            if (!start || isBefore(date, start)) {
                return;
            }
            if (wholeWeeksOnly) {
                date = endOfISOWeek(date);
            }
            setEndPreview(date);
        },
        [start, wholeWeeksOnly]
    );
    const onDateClick = useCallback(
        (date: Date) => {
            if (!start || isBefore(date, start)) {
                if (wholeWeeksOnly) {
                    date = startOfISOWeek(date);
                }
                setStart(date);
            } else if (start && !end && !isSameDay(start, date)) {
                if (wholeWeeksOnly) {
                    date = endOfISOWeek(date);
                }
                setEnd(date);
            } else if (start && end) {
                setEnd(void 0);
                setStart(date);
            }
        },
        [start, end, wholeWeeksOnly]
    );
    useEffect(() => {
        if (start && end) {
            setEndPreview(void 0);
            onChange([start, end]);
            onClose();
            setStart(void 0);
            setEnd(void 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [end, onChange, onClose]);

    useEffect(() => {
        if (start && !end && !isOpen) {
            setStart(void 0);
        }
        if (!isOpen) {
            setEndPreview(void 0);
        }
    }, [start, end, isOpen]);
    const dateString = useMemo(() => {
        if (!from || !to) {
            return "";
        }
        if (!isDateValid(from) || !isDateValid(to)) {
            return "";
        }
        let result = `${format(from, dateFormat)} to ${format(to, dateFormat)}`;
        if (wholeWeeksOnly) {
            result += ` (${differenceInCalendarISOWeeks(to, from) + 1} weeks)`;
        }
        return result;
    }, [from, to, dateFormat, wholeWeeksOnly]);

    return (
        <>
            <Input
                value={dateString}
                ref={referenceRef}
                onClick={onToggle}
                placeholder="Select Date Range"
                isReadOnly
            />
            {isOpen && (
                <Box ref={popperRef} zIndex={1}>
                    <HStack ref={calendarRef} alignItems="baseline">
                        {[from, to].map((day, index) => (
                            <CalendarCore
                                key={index}
                                selectedDays={start ? [start] : []}
                                onDateClick={(date) => {
                                    onDateClick(date);
                                }}
                                selectedDateRanges={
                                    (!start
                                        ? []
                                        : end
                                        ? [[start, end]]
                                        : endPreview
                                        ? [[start, endPreview]]
                                        : []) as [Date, Date][]
                                }
                                firstDate={firstDate}
                                lastDate={lastDate}
                                disableBefore={disableBefore}
                                disableAfter={disableAfter}
                                disabledDays={disabledDays}
                                onDateMouseOver={(date) => {
                                    onDateMouseOver(date);
                                }}
                                initialMonth={
                                    day?.getMonth() || today.getMonth()
                                }
                                initialYear={
                                    day?.getFullYear() || today.getFullYear()
                                }
                                onCalendarMouseLeave={() => {
                                    setEndPreview(void 0);
                                }}
                            />
                        ))}
                    </HStack>
                </Box>
            )}
        </>
    );
};
