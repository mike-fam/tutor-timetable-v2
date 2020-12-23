import { Box, Center, Grid, HStack } from "@chakra-ui/react";
import React from "react";
import { RequestItem } from "./RequestItem";
import { RequestOptions } from "./RequestOptions";

export const Requests: React.FunctionComponent = () => {
    const listTest = [1, 2, 3, 4, 5, 6, 7];

    return (
        <Box>
            <Center>Make a request</Center>
            <HStack spacing={8} style={{ marginLeft: "10%" }}>
                <Box w="70%" h="100%" bg="tomato">
                    <Center>Main container</Center>
                    {listTest.map((item, index) => (
                        <RequestItem key={index} />
                    ))}
                </Box>
                <Box w="20%">
                    <Center>
                        <h1>options</h1>
                    </Center>
                    <RequestOptions />
                </Box>
            </HStack>
        </Box>
    );
};
