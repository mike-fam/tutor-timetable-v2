import React, { FC, Fragment } from "react";
import {
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
    location: string;
    courseCode: string;
};

export const TimetableSessionPopover: FC<Props> = ({
    name,
    courseCode,
    location,
    allocation,
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
                <strong>Allocations:</strong>
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
