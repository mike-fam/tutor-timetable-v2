import { Button, Center, VStack } from "@chakra-ui/react";
import React from "react";

export const RequestOptions: React.FunctionComponent = () => {
    return (
        <>
            <VStack spacing={1} align="stretch">
                <Center>
                    <Button w="50%">New Request</Button>
                </Center>
                <Center>
                    <Button w="50%">button2</Button>
                </Center>
                <Center>
                    <Button w="50%">button 3</Button>
                </Center>
            </VStack>
        </>
    );
};
