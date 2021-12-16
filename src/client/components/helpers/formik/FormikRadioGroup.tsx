import { FC } from "react";
import { FormControl, FormLabel, Radio, Stack } from "@chakra-ui/react";
import { capitalCase } from "change-case";
import { useField } from "formik";

type Props = {
    name: string;
    values: string[];
    label?: string;
    transformValue?: (value: string) => string;
    stackDirection?: "row" | "column";
};

export const FormikRadioGroup: FC<Props> = ({
    name,
    values,
    label,
    transformValue,
    stackDirection = "row",
}) => {
    const [, { value }, { setValue }] = useField(name);

    return (
        <FormControl>
            <FormLabel>{label || capitalCase(name)}</FormLabel>
            <Stack direction={stackDirection} spacing={2}>
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
                        {transformValue?.(radioValue) ||
                            capitalCase(radioValue)}
                    </Radio>
                ))}
            </Stack>
        </FormControl>
    );
};
