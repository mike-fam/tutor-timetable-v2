import { FormControl, FormLabel, Radio, Stack } from "@chakra-ui/react";
import { capitalCase } from "change-case";
import { useField } from "formik";
import React from "react";

type Props = {
    name: string;
    values: string[];
    label?: string;
};

export const FormikRadioGroup: React.FC<Props> = ({ name, values, label }) => {
    const [, { value }, { setValue }] = useField(name);

    return (
        <FormControl mt={3}>
            <FormLabel>{label || capitalCase(name)}</FormLabel>
            <Stack direction="row">
                {values.map((radioValue, key) => (
                    <Radio
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        value={radioValue}
                        isChecked={value === radioValue}
                        key={key}
                        id={`formik-radio-${name}-${key}`}
                    >
                        {radioValue}
                    </Radio>
                ))}
            </Stack>
        </FormControl>
    );
};
