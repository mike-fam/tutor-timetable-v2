import React, { useMemo, Fragment } from "react";
import { Props as SessionProps, Session } from "./Session";
import { PopoverSession } from "./PopoverSession";
import {
    Box,
    Divider,
    ListItem,
    PopoverArrow,
    PopoverBody,
    PopoverHeader,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import { SessionTheme } from "../../types/session";
import { weeksPatternRepr } from "../../utils/session-stream";

// weeks[], allocatedTutors[]
export type StreamCustomSessionProps = {
    courseCode: string;
    baseAllocation: [number[], string[]];
    customAllocation: Array<[number[], string[]]>;
    weekNames: string[];
    location: string;
    theme?: SessionTheme;
};

type Props = SessionProps<StreamCustomSessionProps>;

export const TimetableStreamSession: React.FC<Props> = ({ ...props }) => {
    const { custom, id, name } = props;
    const {
        customAllocation,
        location,
        courseCode,
        weekNames,
        baseAllocation,
    } = useMemo(() => custom(id), [custom, id]);
    return (
        <PopoverSession
            sessionComponent={
                <Session {...props}>
                    <Box p={1}>{name}</Box>
                </Session>
            }
            popoverContent={
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
                            <em>
                                {weeksPatternRepr(weekNames, baseAllocation[0])}
                                :
                            </em>
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
                                        {weeksPatternRepr(
                                            weekNames,
                                            allocation[0]
                                        )}
                                        :
                                    </em>
                                </Text>
                                {allocation[1].length > 0 ? (
                                    <UnorderedList>
                                        {allocation[1].map((name, index) => (
                                            <ListItem key={index}>
                                                {name}
                                            </ListItem>
                                        ))}
                                    </UnorderedList>
                                ) : (
                                    <Text>None</Text>
                                )}
                            </Fragment>
                        ))}
                    </PopoverBody>
                </>
            }
        />
    );
};
