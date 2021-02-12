import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputFieldProps,
    NumberInputStepper,
    PseudoProps,
} from "@chakra-ui/react";
import { FieldInputProps, useField } from "formik";
import React from "react";
import { camelCase, capitalCase } from "change-case";

type Props = {
    name: string;
    id?: string;
    label?: string;
    type?: string;
    max?: number;
    min?: number;
} & Omit<
    NumberInputFieldProps,
    keyof FieldInputProps<any> | "type" | keyof PseudoProps<{}>
>;

export const FormikNumberInput: React.FC<Props> = ({
    name,
    id,
    label,
    type = "text",
    max,
    min,
    ...props
}) => {
    const [, meta, { setValue }] = useField(name);
    return (
        <FormControl
            id={id || camelCase(name)}
            isInvalid={meta.touched && !!meta.error}
            mt={3}
        >
            <FormLabel>{label || capitalCase(name)}</FormLabel>
            <NumberInput
                value={meta.value}
                onChange={(value) => {
                    setValue(parseInt(value));
                }}
                max={max}
                min={min}
            >
                <NumberInputField {...props} />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            {meta.touched && meta.error && (
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
        </FormControl>
    );
};
