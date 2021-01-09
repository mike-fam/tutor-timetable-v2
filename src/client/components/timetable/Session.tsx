import { Box, useColorModeValue } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { sessionStyleFromProps } from "../../utils/timetable";

export type Props = {
    name: string;
    startTime: number;
    endTime: number;
    startDay: number;
    endDay: number;
    stackSize: number;
    stackIndex: number;
};

export const Session: React.FC<Props> = ({ children, ...props }) => {
    const { width, height, display, left, top } = useMemo(
        () => sessionStyleFromProps(props),
        [props]
    );
    const bg = useColorModeValue("gray.800", "blue.500");
    return (
        <Box
            position="absolute"
            w={width}
            h={height}
            display={display}
            left={left}
            top={top}
            bg={bg}
            color="white"
            rounded="base"
        >
            {children}
        </Box>
    );
};
