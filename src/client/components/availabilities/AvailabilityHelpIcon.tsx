import { FC } from "react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { HelpIcon } from "../helpers/HelpIcon";

type Props = {};

export const AvailabilityHelpIcon: FC<Props> = () => {
    return (
        <HelpIcon>
            <UnorderedList>
                <ListItem>
                    Click on a rectangle on the timetable to add a new available
                    timeslot.
                </ListItem>
                <ListItem>
                    Drag the top and bottom edges of a timeslot to change the
                    time.
                </ListItem>
                <ListItem>
                    Right click on a timeslot to (un)delete or update it.
                </ListItem>
            </UnorderedList>
        </HelpIcon>
    );
};
