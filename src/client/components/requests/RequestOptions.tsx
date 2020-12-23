import { Box, Button, Center, Divider, VStack } from "@chakra-ui/react";
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
                <Divider></Divider>
                {/* Options only visible to coordiantors.*/}
                <Center>
                    <Button w="50%">Invoke</Button>
                </Center>
                <Center>
                    <Button w="50%">Finalise</Button>
                </Center>
            </VStack>
        </>
    );
};
