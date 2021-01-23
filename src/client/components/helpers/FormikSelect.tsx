import React from "react";
import { Field, FieldProps } from "formik";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select,
} from "@chakra-ui/react";
import { capitalCase } from "change-case";

type Props = {
    name: string;
    label?: string;
    id?: string;
    options: Array<string | number>;
    optionToText?: (val: string) => string;
};

export const FormikSelect: React.FC<Props> = ({
    name,
    id,
    label,
    options,
    optionToText = (option) => option,
}) => {
    return (
        <Field name={name}>
            {({ field, meta }: FieldProps) => (
                <FormControl id={id || name} pt={3}>
                    <FormLabel>{label || capitalCase(name)}</FormLabel>
                    <Select {...field}>
                        {options.map((option) => (
                            <option value={option} key={option}>
                                {optionToText(option.toString())}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
};
