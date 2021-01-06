import React from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";

type Props = {};

export const LoadingSpinner: React.FC<Props> = () => {
    return (
        <Box w="100%" h="100%">
            <Center>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Center>
        </Box>
    );
};
