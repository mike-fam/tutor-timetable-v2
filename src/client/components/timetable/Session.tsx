import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
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

export const Session: React.FC<Props> = ({ name, ...props }) => {
    const { width, height, display, left, top } = sessionStyleFromProps(props);
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
            p={1}
            color="white"
        >
            {name}
        </Box>
    );
};
