import { FormControl, FormLabel, Radio } from "@chakra-ui/react";
import { capitalCase } from "change-case";
import { Field, FieldProps } from "formik";
import React from "react";

type Props = {
    name: string;
    values: string[];
    label?: string;
};

export const FormikRadioGroup: React.FC<Props> = ({ name, values, label }) => {
    return (
        <FormControl name={name}>
            <FormLabel>{label || capitalCase(name)}</FormLabel>
            {values.map((value) => (
                <Field name={name}>
                    {({ field }: FieldProps) => (
                        <Radio {...field}>{value}</Radio>
                    )}
                </Field>
            ))}
        </FormControl>
    );
};
