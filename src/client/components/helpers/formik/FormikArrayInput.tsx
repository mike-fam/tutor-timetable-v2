import React, { ReactElement } from "react";
import { useField } from "formik";
import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    HStack,
    IconButton,
    Input,
} from "@chakra-ui/react";
import { capitalCase } from "change-case";
import { removeAtIndex, updateElementAtIndex } from "../../../utils/array";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useArray } from "../../../hooks/useArray";

type Props<T> = {
    name: string;
    label?: string;
    columns?: number;
    strToValue: (str: string) => T;
    valueToStr: (value: T, index: number) => string;
    defaultValue: (index: number) => T;
    helpText?: (value: T, index: number) => string;
};

export const FormikArrayInput = <T,>({
    name,
    label,
    strToValue,
    valueToStr,
    defaultValue,
    columns = 1,
    helpText,
}: Props<T>): ReactElement => {
    const [, { value: values }, { setValue: setValues }] =
        useField<Array<T>>(name);
    // To prevent re-rendering and keep inputs focused on change
    const [valuesClone, { setValue: setValueClones }] = useArray(values);
    return (
        <FormControl>
            <HStack alignItems="baseline">
                <FormLabel>{label || capitalCase(name)}</FormLabel>
                <IconButton
                    aria-label={`add-${name}-element`}
                    icon={<AddIcon />}
                    size="sm"
                    onClick={() => {
                        setValues([...values, defaultValue(values.length)]);
                    }}
                    colorScheme="green"
                />
            </HStack>
            <Grid templateColumns={`repeat(${columns}, 1fr)`} my={2} gap={6}>
                {values.map((value, index) => (
                    <HStack key={index} spacing={1} alignItems="flex-start">
                        <Box w="100%">
                            <Input
                                value={valueToStr(valuesClone[index], index)}
                                onChange={(e) => {
                                    setValueClones(
                                        updateElementAtIndex(
                                            values,
                                            index,
                                            strToValue(e.target.value)
                                        )
                                    );
                                }}
                                onBlur={() => setValues(valuesClone)}
                                size="sm"
                                key={valueToStr(value, index)}
                            />
                            {helpText && (
                                <FormHelperText>
                                    {helpText(value, index)}
                                </FormHelperText>
                            )}
                        </Box>
                        <IconButton
                            aria-label={`remove-active-event-${index}`}
                            icon={<MinusIcon />}
                            variant="ghost"
                            colorScheme="red"
                            size="sm"
                            onClick={() => {
                                setValues(removeAtIndex(values, index));
                            }}
                        />
                    </HStack>
                ))}
            </Grid>
        </FormControl>
    );
};
