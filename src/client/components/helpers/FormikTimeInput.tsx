import React, { FC, useCallback } from "react";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { Field, FieldProps, useField } from "formik";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputProps,
} from "@chakra-ui/react";
import { camelCase, capitalCase } from "change-case";

type Props = {
    name: string;
    id?: string;
    label?: string;
} & Omit<InputProps, "type">;

export const FormikTimeInput: FC<Props> = ({ name, id, label, ...props }) => {
    const timeToString = useCallback((time: number) => {
        const mins = Math.round(((time || 0) % 1) * 60);
        const hours = Math.floor(time || 0);
        return format(new Date(0, 0, 0, hours, mins), "HH:mm");
    }, []);

    const stringToTime = useCallback((formatString: string) => {
        if (!formatString) {
            return 0;
        }
        const startDate = parse(formatString, "HH:mm", new Date());
        return startDate.getHours() + startDate.getMinutes() / 60;
    }, []);
    const [, { value }, { setValue }] = useField(name);
    return (
        <Field name={name}>
            {({ field, form, meta }: FieldProps) => (
                <FormControl
                    id={id || camelCase(name)}
                    isInvalid={!!form.errors[name] && !!form.touched[name]}
                    mt={3}
                >
                    <FormLabel>{label || capitalCase(name)}</FormLabel>
                    <Input
                        {...props}
                        {...field}
                        type="time"
                        value={timeToString(value)}
                        onChange={(e) => setValue(stringToTime(e.target.value))}
                    />
                    {meta.touched && meta.error && (
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                    )}
                </FormControl>
            )}
        </Field>
    );
};
