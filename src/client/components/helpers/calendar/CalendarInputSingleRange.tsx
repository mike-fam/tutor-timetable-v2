import React, { useRef } from "react";
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

type Props = Omit<InputProps, "value" | "onChange"> & {
    dateFormat?: string;
    value: [Date, Date];
    onChange: (dateRange: [Date, Date]) => void;
    firstDate?: Date;
    lastDate?: Date;
    disableBefore?: Date;
    disableAfter?: Date;
    disabledDays?: Date[];
    onDateMouseOver?: (date: Date) => void;
    onDateMouseLeave?: (date: Date) => void;
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
    onDateMouseOver,
    onDateMouseLeave,
}) => {
    const [from, to] = value;
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { popperRef, referenceRef } = usePopper({
        placement: "bottom-start",
    });
    const calendarRef = useRef<HTMLDivElement>(null);
    useOutsideClick({ ref: calendarRef, handler: onClose });

    return (
        <>
            <Input
                value={`${format(from, dateFormat)} to ${format(
                    to,
                    dateFormat
                )}`}
                ref={referenceRef}
                onClick={onToggle}
            />
            {isOpen && (
                <Box ref={popperRef} zIndex={1}>
                    <HStack ref={calendarRef}>
                        <CalendarCore
                            selectedDays={[from, to]}
                            onDateClick={(date) => {
                                onClose();
                            }}
                            firstDate={firstDate}
                            lastDate={lastDate}
                            disableBefore={disableBefore}
                            disableAfter={disableAfter}
                            disabledDays={disabledDays}
                            onDateMouseOver={onDateMouseOver}
                            onDateMouseLeave={onDateMouseLeave}
                            initialMonth={from.getMonth()}
                            initialYear={from.getFullYear()}
                        />
                        <CalendarCore
                            selectedDays={[from, to]}
                            onDateClick={(date) => {
                                onClose();
                            }}
                            firstDate={firstDate}
                            lastDate={lastDate}
                            disableBefore={disableBefore}
                            disableAfter={disableAfter}
                            disabledDays={disabledDays}
                            onDateMouseOver={onDateMouseOver}
                            onDateMouseLeave={onDateMouseLeave}
                            initialMonth={from.getMonth()}
                            initialYear={from.getFullYear()}
                        />
                    </HStack>
                </Box>
            )}
        </>
    );
};
