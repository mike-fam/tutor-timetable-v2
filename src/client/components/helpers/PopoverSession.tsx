import React from "react";
import { Props as SessionProps, Session } from "../timetable/Session";
import {
    Box,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    UnorderedList,
} from "@chakra-ui/react";

type Props<T> = SessionProps & T

export const PopoverSession = <T,>({ children: _, ...props }: Props<T>) => {
    const sessionProps = pick(props, Object.keys())
    return (
        <Popover trigger="hover" placement="auto">
            <PopoverTrigger>
                <Session {...props}>
                    <Box p={1}>{name}</Box>
                </Session>
            </PopoverTrigger>
            <PopoverContent>

            </PopoverContent>
        </Popover>
    );
};
