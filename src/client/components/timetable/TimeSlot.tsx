import { FC } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

type Props = {};

export const TimeSlot: FC<Props> = ({ children }) => {
    const evenStripes = useColorModeValue("lightgrey", "#2B6CB0");
    const oddStripes = useColorModeValue("darkgrey", "#2C5282");
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
