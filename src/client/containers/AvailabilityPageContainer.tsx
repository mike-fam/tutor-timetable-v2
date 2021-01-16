import React, { useState } from "react";
import { AvailabilityTimetableContainer } from "./AvailabilityTimetableContainer";
import { Map } from "immutable";
import { AvailabilityContext } from "../utils/availability";
import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    UnorderedList,
} from "@chakra-ui/react";
import { Wrapper } from "../components/helpers/Wrapper";
import { AvailabilitySubmitButton } from "./AvailabilitySubmitButton";
import { TimeslotInput } from "../generated/graphql";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { AvailabilityHelpIcon } from "../components/availabilities/AvailabilityHelpIcon";

type Props = {};

export const AvailabilityPageContainer: React.FC<Props> = () => {
    const [existingTimeslots, setExistingTimeslots] = useState(
        Map<number, TimeslotInput>()
    );
    return (
        <AvailabilityContext.Provider
            value={{
                timeslots: existingTimeslots,
                setTimeslots: setExistingTimeslots,
            }}
        >
            <Wrapper>
                <Flex direction="column">
                    <HStack spacing={3}>
                        <Heading>Availability</Heading>
                        <AvailabilityHelpIcon />
                    </HStack>
                    <Box ml="auto">
                        <AvailabilitySubmitButton />
                    </Box>
                    <AvailabilityTimetableContainer />
                </Flex>
            </Wrapper>
        </AvailabilityContext.Provider>
    );
};
