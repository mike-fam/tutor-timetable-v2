import React, { useState } from "react";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputProps,
    PseudoProps,
} from "@chakra-ui/react";

type Props = Omit<InputProps, keyof PseudoProps<HTMLInputElement>> & {
    validate: (value: string) => string;
    label: string;
};

export const InputWithError: React.FC<Props> = ({
    onBlur,
    onChange,
    validate,
    label,
    isDisabled,
    ...props
}) => {
    const [error, setError] = useState("");
    return (
        <FormControl
            isInvalid={!!error}
            mt={4}
            isDisabled={isDisabled}
            isReadOnly={isDisabled}
        >
            <FormLabel>{label}:</FormLabel>
            <Input
                {...props}
                onBlur={(e) => {
                    setError(validate(e.target.value));
                    onBlur?.(e);
                }}
                onChange={(e) => {
                    onChange?.(e);
                }}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};
