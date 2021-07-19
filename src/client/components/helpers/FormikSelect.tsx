import React from "react";
import { Field, FieldProps } from "formik";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select,
    SelectProps,
} from "@chakra-ui/react";
import { capitalCase } from "change-case";

type Props = {
    name: string;
    label?: string;
    id?: string;
    options: Array<string | number>;
    optionToText?: (val: string | number) => string;
} & SelectProps;

export const FormikSelect: React.FC<Props> = ({
    name,
    id,
    label,
    options,
    optionToText = capitalCase,
    ...props
}) => {
    console.log(props.isDisabled);
    return (
        <Field name={name}>
            {({ field, meta }: FieldProps) => (
                <FormControl id={id || name} mt={3}>
                    <FormLabel>{label || capitalCase(name)}</FormLabel>
                    <Select {...field} {...props}>
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
