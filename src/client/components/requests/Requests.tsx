import { Box, Center, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { RequestItem } from "./RequestItem";
import { RequestOptions } from "./RequestOptions";

export const Requests: React.FunctionComponent = () => {
    const listTest = [1, 2, 3, 4, 5, 6, 7];

    return (
        <Box>
            <Center>
                <Heading>Request a swap</Heading>
            </Center>
            {/* Each request item opens a modal */}
            <HStack spacing={8} style={{ marginLeft: "10%" }}>
                <Box w="75%" h="100%" bg="tomato">
                    {listTest.map((item, index) => (
                        <>
                            <RequestItem key={index} />
                            <br></br>
                        </>
                    ))}
                </Box>
                <Box w="15%">
                    <Center>
                        <h1>options</h1>
                    </Center>
                    <RequestOptions />
                </Box>
            </HStack>
        </Box>
    );
};
