import { FC } from "react";
import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputFieldProps,
    NumberInputStepper,
} from "@chakra-ui/react";

type Props = Omit<NumberInputFieldProps, "value" | "onChange" | "size"> & {
    max?: number;
    min?: number;
    size?: string;
    value: number;
    inline?: boolean;
    onChange: (value: number) => any;
};

export const SimpleNumberInput: FC<Props> = ({
    max,
    min,
    value,
    onChange,
    size,
    inline = false,
}) => {
    return (
        <NumberInput
            size={size}
            value={value}
            onChange={(value) => {
                onChange(parseInt(value));
            }}
            max={max}
            min={min}
            errorBorderColor="red.500"
            w={inline ? "7ch" : undefined}
            display={inline ? "inline-block" : undefined}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    );
};
