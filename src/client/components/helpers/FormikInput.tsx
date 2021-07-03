import React from "react";
import { Field, FieldProps } from "formik";
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
    type?: string;
} & InputProps;

export const FormikInput: React.FC<Props> = ({
    name,
    id,
    label,
    type = "text",
    ...props
}) => {
    return (
        <Field name={name}>
            {({ field, form, meta }: FieldProps) => (
                <FormControl
                    id={id || camelCase(name)}
                    isInvalid={!!form.errors[name] && !!form.touched[name]}
                    mt={3}
                >
                    <FormLabel>{label || capitalCase(name)}</FormLabel>
                    <Input {...props} {...field} type={type} />
                    {meta.touched && meta.error && (
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                    )}
                </FormControl>
            )}
        </Field>
    );
};
