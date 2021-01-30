import React, { useEffect, useState } from "react";
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
    ...props
}) => {
    const [error, setError] = useState("");
    useEffect(() => {
        console.log(error);
    }, [error]);
    return (
        <FormControl isInvalid={!!error}>
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
