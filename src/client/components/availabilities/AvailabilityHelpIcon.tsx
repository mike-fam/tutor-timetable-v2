import React from "react";
import {
    Box,
    Icon,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    UnorderedList,
} from "@chakra-ui/react";
import { BsFillQuestionCircleFill } from "react-icons/bs";

type Props = {};

export const AvailabilityHelpIcon: React.FC<Props> = ({}) => {
    return (
        <Popover placement="right-start" trigger="hover">
            <PopoverTrigger>
                <Box>
                    <Icon as={BsFillQuestionCircleFill} />
                </Box>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                    <UnorderedList>
                        <ListItem>
                            Click on a rectangle on the timetable to add a new
                            available timeslot.
                        </ListItem>
                        <ListItem>
                            Drag the top and bottom edges of a timeslot to
                            change the time.
                        </ListItem>
                        <ListItem>
                            Right click on a timeslot to (un)delete or update
                            it.
                        </ListItem>
                    </UnorderedList>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
