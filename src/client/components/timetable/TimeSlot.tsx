import { Box } from "@chakra-ui/react";
import React from "react";

type Props = {};

export const TimeSlot: React.FC<Props> = ({}) => {
    return (
        <Box
            w="100%"
            h="100%"
            _even={{
                bgImage: `repeating-linear-gradient(-45deg, lightgrey, lightgrey 1px, transparent 1px, transparent 4px)`,
            }}
            _odd={{
                bgImage: `repeating-linear-gradient(-45deg, darkgrey, darkgrey 1px, transparent 1px, transparent 4px)`,
            }}
        />
    );
};
