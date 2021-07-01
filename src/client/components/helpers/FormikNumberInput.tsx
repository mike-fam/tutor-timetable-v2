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
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { camelCase, capitalCase } from "change-case";

type Props = {
    name: string;
    id?: string;
    label?: string;
    type?: string;
    max?: number;
    min?: number;
} & NumberInputFieldProps;

export const FormikNumberInput: React.FC<Props> = ({
    name,
    id,
    label,
    type = "text",
    max,
    min,
    ...props
}) => {
    const [, meta, { setValue, setTouched }] = useField(name);
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
                onFocus={() => {
                    setTouched(true);
                }}
                onBlur={() => {
                    setTouched(false);
                }}
                errorBorderColor="red.500"
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
