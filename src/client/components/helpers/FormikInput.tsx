import React from "react";
import { Field, FieldProps } from "formik";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { sentenceCase } from "change-case";

type Props = {
    name: string;
    id?: string;
    label?: string;
    type?: string;
};

export const FormikInput: React.FC<Props> = ({
    name,
    id,
    label,
    type = "text",
}) => {
    return (
        <Field name={name}>
            {({ field, form, meta }: FieldProps) => (
                <FormControl
                    id={id || name}
                    isInvalid={!!form.errors[name] && !!form.touched[name]}
                >
                    <FormLabel>{label || sentenceCase(name)}</FormLabel>
                    <Input {...field} type={type} />
                    {meta.touched && meta.error && (
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                    )}
                </FormControl>
            )}
        </Field>
    );
};
