import { FormLabel, Radio, RadioGroup } from "@chakra-ui/react";
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
        <>
            <FormLabel>{label || capitalCase(name)}</FormLabel>
            <Field name={name}>
                {({ field }: FieldProps) => (
                    <RadioGroup {...field}>
                        {values.map((value) => (
                            <Radio>{value}</Radio>
                        ))}
                    </RadioGroup>
                )}
            </Field>
        </>
    );
};
