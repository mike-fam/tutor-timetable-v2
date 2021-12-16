import { FC, useRef } from "react";
import {
    Box,
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
    value: Date;
    onChange: (date: Date) => void;
    firstDate?: Date;
    lastDate?: Date;
    disableBefore?: Date;
    disableAfter?: Date;
    disabledDays?: Date[];
    onDateMouseOver?: (date: Date) => void;
    onDateMouseLeave?: (date: Date) => void;
};

export const CalendarInputSingleDate: FC<Props> = ({
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
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { popperRef, referenceRef } = usePopper({
        placement: "bottom-start",
    });
    const calendarRef = useRef<HTMLDivElement>(null);
    useOutsideClick({ ref: calendarRef, handler: onClose });

    return (
        <>
            <Input
                value={format(value, dateFormat)}
                ref={referenceRef}
                onClick={onToggle}
            />
            {isOpen && (
                <Box ref={popperRef} zIndex={1}>
                    <CalendarCore
                        ref={calendarRef}
                        selectedDays={[value]}
                        onDateClick={(date) => {
                            onChange(date);
                            onClose();
                        }}
                        firstDate={firstDate}
                        lastDate={lastDate}
                        disableBefore={disableBefore}
                        disableAfter={disableAfter}
                        disabledDays={disabledDays}
                        onDateMouseOver={onDateMouseOver}
                        onDateMouseLeave={onDateMouseLeave}
                        initialMonth={value.getMonth()}
                        initialYear={value.getFullYear()}
                    />
                </Box>
            )}
        </>
    );
};
