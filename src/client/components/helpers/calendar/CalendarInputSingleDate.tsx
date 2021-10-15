import React, { createRef } from "react";
import { Input, InputProps, useOutsideClick } from "@chakra-ui/react";
import format from "date-fns/format";

type Props = Omit<InputProps, "value" | "onChange"> & {
    dateFormat?: string;
    value: Date;
    onChange: (date: Date) => void;
};

export const CalendarInputSingleDate: React.FC<Props> = ({
    dateFormat = "dd/MM/yyyy",
    value,
    onChange,
}) => {
    const ref = createRef<HTMLDivElement>();
    useOutsideClick({ ref });
    return <Input value={format(value, dateFormat)} />;
};
