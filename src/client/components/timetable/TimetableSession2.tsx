import React, { useMemo } from "react";
import { SessionTheme } from "../../types/session";
import { Props as SessionProps, Session } from "./Session";
import { PopoverSession } from "./PopoverSession";
import {
    Box,
    ListItem,
    PopoverArrow,
    PopoverBody,
    PopoverHeader,
    Text,
    UnorderedList,
} from "@chakra-ui/react";

export type TimetableCustomSessionProps = {
    allocation: string[];
    location: string;
    courseCode: string;
    theme?: SessionTheme;
};

export type Props = SessionProps<TimetableCustomSessionProps>;

export const TimetableSession2: React.FC<Props> = (props) => {
    const { custom, id, name } = props;
    const { allocation, location, courseCode } = useMemo(
        () => custom(id),
        [custom, id]
    );
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
            }
        />
    );
};
