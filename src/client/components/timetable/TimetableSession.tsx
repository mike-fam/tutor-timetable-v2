import React from "react";
import { Props as SessionProps, Session } from "./Session";
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

type Props = SessionProps;

export const TimetableSession: React.FC<Props> = ({
    children: _,
    ...props
}) => {
    const { name, allocation, location } = props;
    return (
        <Popover trigger="hover" placement="auto">
            <PopoverTrigger>
                <Session {...props}>
                    <Box p={1}>{name}</Box>
                </Session>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>{name}</PopoverHeader>
                <PopoverBody>
                    <Text>
                        <strong>Location:</strong> {location || "None"}
                    </Text>
                    <Text fontWeight="bold">Allocations:</Text>
                    {allocation.length > 0 ? (
                        <UnorderedList>
                            {allocation.map((name, index) => (
                                <ListItem key={index}>{name}</ListItem>
                            ))}
                        </UnorderedList>
                    ) : (
                        <Text>None</Text>
                    )}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
