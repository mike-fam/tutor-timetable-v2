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
import { defaultStr } from "../../../constants";
import { v4 as uuid } from "uuid";
import sortBy from "lodash/sortBy";

type Props = {
    name: string;
    label?: string;
    options: Array<string | number>;
    optionToText?: (val: string | number) => string;
    renderLabel?: boolean;
    sorted?: boolean;
} & SelectProps;

export const FormikSelect: React.FC<Props> = ({
    name,
    label,
    options,
    optionToText = capitalCase,
    renderLabel = true,
    sorted = false,
    ...props
}) => {
    return (
        <Field name={name}>
            {({ field, meta }: FieldProps) => (
                <FormControl id={uuid()}>
                    {renderLabel && (
                        <FormLabel>{label || capitalCase(name)}</FormLabel>
                    )}
                    <Select {...field} {...props}>
                        <option disabled value={defaultStr}>
                            Select a value
                        </option>
                        {(sorted
                            ? sortBy(options, (option) =>
                                  optionToText(option.toString())
                              )
                            : options
                        ).map((option) => (
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
