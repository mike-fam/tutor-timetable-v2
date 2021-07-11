import React from "react";
import { Props as SessionProps, Session } from "./Session";
import { Box, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

type Props<T> = SessionProps<T>;

export const PopoverSession = <T,>({ children: _, ...props }: Props<T>) => {
    return (
        <Popover trigger="hover" placement="auto">
            <PopoverTrigger>
                <Session {...props}>
                    <Box p={1}>Hi</Box>
                </Session>
            </PopoverTrigger>
            <PopoverContent>Hi</PopoverContent>
        </Popover>
    );
};
