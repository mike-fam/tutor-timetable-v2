import { Box } from "@chakra-ui/react";
import React from "react";

type Props = {};

export const Wrapper: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <Box maxW="80%" mx="auto" mt={10}>
            {children}
        </Box>
    );
};
