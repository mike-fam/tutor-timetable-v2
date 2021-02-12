import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { OfferDayTimetablePreview } from "./OfferDayTimetablePreview";

type Props = {
    requestId: number;
};

export const ViewRequestContainer: React.FC<Props> = ({ requestId }) => {
    // TODO: Get data here and change to actual session
    console.log(requestId);
    return (
        <Grid templateColumns="1fr 3fr">
            <Stack>
                <Text>Title: </Text>
                <Text>Description: </Text>
                <Text>Duration: </Text>
                <Text>Session: </Text>
                <Text>Preferences: </Text>
            </Stack>
            <Box>
                <Text>On that day:</Text>
                <OfferDayTimetablePreview sessionId={83} />
            </Box>
        </Grid>
    );
};
