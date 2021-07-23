import React, { FC } from "react";
import {
    chakra,
    ListItem,
    PopoverArrow,
    PopoverBody,
    PopoverHeader,
    Text,
    UnorderedList,
} from "@chakra-ui/react";

type Props = {
    name: string;
    allocation: string[];
    numberOfStaff: number;
    location: string;
    courseCode: string;
};

export const TimetableSessionPopover: FC<Props> = ({
    name,
    courseCode,
    location,
    allocation,
    numberOfStaff,
}) => {
    return (
        <>
            <PopoverArrow />
            <PopoverHeader>{name}</PopoverHeader>
            <PopoverBody>
                <Text>
                    <strong>Course:</strong> {courseCode}
                </Text>
                <Text>
                    <strong>Location:</strong> {location || "None"}
                </Text>
                <chakra.span fontWeight="bold">
                    Allocations:{" "}
                    <chakra.span
                        color={
                            allocation.length < numberOfStaff
                                ? "red.500"
                                : "green.500"
                        }
                    >
                        {allocation.length}/{numberOfStaff}
                    </chakra.span>
                </chakra.span>
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
        </>
    );
};
