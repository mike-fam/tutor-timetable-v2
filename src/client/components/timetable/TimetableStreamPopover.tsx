import React, { FC, Fragment } from "react";
import {
    Divider,
    ListItem,
    PopoverArrow,
    PopoverBody,
    PopoverHeader,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import { weeksPatternRepr } from "../../utils/session-stream";

type Props = {
    name: string;
    courseCode: string;
    baseAllocation: [number[], string[]];
    customAllocation: Array<[number[], string[]]>;
    weekNames: string[];
    location: string;
};

export const TimetableStreamPopover: FC<Props> = ({
    name,
    courseCode,
    location,
    weekNames,
    baseAllocation,
    customAllocation,
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
                <Divider />
                <Text>
                    <strong>Base Allocations:</strong>
                </Text>
                <Text>
                    <em>{weeksPatternRepr(weekNames, baseAllocation[0])}:</em>
                </Text>
                {baseAllocation[1].length > 0 ? (
                    <UnorderedList>
                        {baseAllocation[1].map((name, index) => (
                            <ListItem key={index}>{name}</ListItem>
                        ))}
                    </UnorderedList>
                ) : (
                    <Text>None</Text>
                )}
                <Divider />
                <Text>
                    <strong>Extra Allocations:</strong>
                </Text>
                {customAllocation.map((allocation, key) => (
                    <Fragment key={key}>
                        <Text>
                            <em>
                                {weeksPatternRepr(weekNames, allocation[0])}:
                            </em>
                        </Text>
                        {allocation[1].length > 0 ? (
                            <UnorderedList>
                                {allocation[1].map((name, index) => (
                                    <ListItem key={index}>{name}</ListItem>
                                ))}
                            </UnorderedList>
                        ) : (
                            <Text>None</Text>
                        )}
                    </Fragment>
                ))}
            </PopoverBody>
        </>
    );
};
