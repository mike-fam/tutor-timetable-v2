import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

type Props = {};

export const TimeSlot: React.FC<Props> = ({ children }) => {
    const evenStripes = useColorModeValue("lightgrey", "#1A365D");
    const oddStripes = useColorModeValue("darkgrey", "#2A4365");
    return (
        <Box
            w="100%"
            h="100%"
            _even={{
                bgImage: `repeating-linear-gradient(-45deg, ${evenStripes}, ${evenStripes} 1px, transparent 1px, transparent 4px)`,
            }}
            _odd={{
                bgImage: `repeating-linear-gradient(-45deg, ${oddStripes}, ${oddStripes} 1px, transparent 1px, transparent 4px)`,
            }}
        >
            {children}
        </Box>
    );
};
