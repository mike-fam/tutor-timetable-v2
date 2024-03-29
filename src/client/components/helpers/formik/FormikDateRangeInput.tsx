import { FC } from "react";
import {
    CalendarInputSingleRange,
    Props as CalendarRangeInputProps,
} from "../calendar/CalendarInputSingleRange";
import { useField } from "formik";
import { camelCase, capitalCase } from "change-case";
import { FormControl, FormLabel } from "@chakra-ui/react";

type Props = Omit<CalendarRangeInputProps, "value" | "onChange"> & {
    nameFrom: string;
    nameTo: string;
    label?: string;
    id?: string;
    onChange?: (range: [Date, Date]) => void;
};

export const FormikDateRangeInput: FC<Props> = ({
    nameFrom,
    nameTo,
    label,
    id,
    onChange = () => {},
    ...props
}) => {
    const [
        ,
        { value: from },
        { setValue: setValueFrom, setTouched: setTouchedFrom },
    ] = useField<Date>(nameFrom);
    const [
        ,
        { value: to },
        { setValue: setValueTo, setTouched: setTouchedTo },
    ] = useField<Date>(nameTo);
    return (
        <FormControl id={id || `${camelCase(nameFrom)}-${camelCase(nameTo)}`}>
            <FormLabel>
                {label || `${capitalCase(nameFrom)} - ${capitalCase(nameTo)}`}
            </FormLabel>
            <CalendarInputSingleRange
                {...props}
                value={[from, to]}
                onChange={([newFrom, newTo]) => {
                    setTouchedFrom(true);
                    setTouchedTo(true);
                    setValueFrom(newFrom);
                    setValueTo(newTo);
                    onChange([newFrom, newTo]);
                }}
            />
        </FormControl>
    );
};
