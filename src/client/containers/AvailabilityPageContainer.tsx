import React, { useState } from "react";
import { AvailabilityTimetableContainer } from "./AvailabilityTimetableContainer";
import { Map, Set } from "immutable";
import { AvailabilityContext } from "../utils/availability";
import { Box, Stack } from "@chakra-ui/react";
import { Wrapper } from "../components/helpers/Wrapper";
import { AvailabilitySubmitButton } from "./AvailabilitySubmitButton";
import { TimeslotInput } from "../generated/graphql";

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
                <Stack>
                    <Box ml="auto">
                        <AvailabilitySubmitButton />
                    </Box>
                    <AvailabilityTimetableContainer />
                </Stack>
            </Wrapper>
        </AvailabilityContext.Provider>
    );
};
