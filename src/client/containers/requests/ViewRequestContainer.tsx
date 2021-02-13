import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo } from "react";
import { OfferDayTimetablePreview } from "./OfferDayTimetablePreview";
import { RequestContext } from "../../hooks/useRequestUtils";
import { SessionsContext } from "../../hooks/useSessionUtils";

type Props = {
    requestId: number;
};

export const ViewRequestContainer: React.FC<Props> = ({ requestId }) => {
    const { requests, fetchRequestById } = useContext(RequestContext);
    useEffect(() => {
        if (!requests.get(requestId)) {
            fetchRequestById(requestId);
        }
    });
    const request = useMemo(() => requests.get(requestId), [
        requestId,
        requests,
    ]);
    return (
        <Grid templateColumns="1fr 1fr">
            <Stack gridRow={2} gridColumn={1}>
                <Text fontSize="lg">
                    <strong>Title</strong>: {request?.title}
                </Text>
                <Text fontSize="lg">
                    <strong>Description</strong>: {request?.description}
                </Text>
                <Text fontSize="lg">
                    <strong>Type</strong>: {request?.type}
                </Text>
                <Text fontSize="lg">
                    <strong>Session</strong>:{" "}
                    {request?.session.sessionStream.name} on{" "}
                    {
                        request?.session.sessionStream.timetable.term.weekNames[
                            request?.session.week
                        ]
                    }
                </Text>
            </Stack>
            <Text gridRow={1} gridColumn={2} fontSize="xl">
                On that day:
            </Text>
            <Box gridRow={2} gridColumn={2}>
                {request?.session && (
                    <OfferDayTimetablePreview sessionId={request.session.id} />
                )}
            </Box>
        </Grid>
    );
};
