import { FC, Fragment } from "react";
import {
    chakra,
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
    baseAllocation: [number[], string[], number];
    customAllocation: Array<[number[], string[], number]>;
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
    const [baseWeeks, baseAllocatedUsers, baseNumberOfStaff] = baseAllocation;
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
                    <chakra.span fontWeight="bold">
                        Base Allocations:
                    </chakra.span>
                </Text>
                <Text>
                    <chakra.span fontWeight="bold">
                        {weeksPatternRepr(weekNames, baseWeeks)}:{" "}
                        <chakra.span
                            color={
                                baseAllocatedUsers.length < baseNumberOfStaff
                                    ? "red.500"
                                    : "green.500"
                            }
                        >
                            {baseAllocatedUsers.length}/{baseNumberOfStaff}
                        </chakra.span>
                    </chakra.span>
                </Text>
                {baseAllocatedUsers.length > 0 ? (
                    <UnorderedList>
                        {baseAllocatedUsers.map((name, index) => (
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
                {customAllocation.map(
                    ([weeks, allocatedUsers, numberOfStaff], key) => (
                        <Fragment key={key}>
                            <Text>
                                <chakra.span fontStyle="italic">
                                    {weeksPatternRepr(weekNames, weeks)}:{" "}
                                    <chakra.span
                                        fontWeight="bold"
                                        color={
                                            allocatedUsers.length <
                                            numberOfStaff
                                                ? "red.500"
                                                : "green.500"
                                        }
                                    >
                                        {allocatedUsers.length}/{numberOfStaff}
                                    </chakra.span>
                                </chakra.span>
                            </Text>
                            {allocatedUsers.length > 0 ? (
                                <UnorderedList>
                                    {allocatedUsers.map((name, index) => (
                                        <ListItem key={index}>{name}</ListItem>
                                    ))}
                                </UnorderedList>
                            ) : (
                                <Text>None</Text>
                            )}
                        </Fragment>
                    )
                )}
            </PopoverBody>
        </>
    );
};
