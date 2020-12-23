import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

export const RequestItem: React.FunctionComponent = () => {
    return (
        <Box>
            <Heading size="md">Request Title</Heading>
            <Text>Requestor name, status, session</Text>
        </Box>
    );
};
