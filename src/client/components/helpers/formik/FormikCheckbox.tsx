import React from "react";
import { useField } from "formik";
import { capitalCase } from "change-case";
import { Checkbox, FormControl, FormLabel } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

type Props = {
    name: string;
    label?: string;
    as: React.ComponentType<{ isChecked: boolean; onChange: () => void }>;
};

export const FormikCheckbox: React.FC<Props> = ({
    name,
    label,
    as = Checkbox,
}) => {
    const [, { value }, { setValue }] = useField<boolean>(name);
    const Component = as;
    return (
        <FormControl id={uuid()}>
            <FormLabel>{label || capitalCase(name)}</FormLabel>
            <Component
                isChecked={value}
                onChange={() => {
                    setValue(!value);
                }}
            />
        </FormControl>
    );
};
