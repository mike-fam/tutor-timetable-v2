import { FC, useState } from "react";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputProps,
} from "@chakra-ui/react";

type Props = InputProps & {
    validate: (value: string) => string;
    label: string;
};

export const InputWithError: FC<Props> = ({
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
