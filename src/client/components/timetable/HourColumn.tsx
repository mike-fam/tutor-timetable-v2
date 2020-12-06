import React from "react";
import {
    firstLineHeight,
    gap,
    timeSlotHeight,
} from "../../constants/timetable";
import range from "lodash/range";
import { Box, Grid } from "@chakra-ui/react";

type Props = {
    startTime: number;
    endTime: number;
};

export const HourColumn: React.FC<Props> = ({ startTime, endTime }) => {
    return (
        <Grid
            templateRows={`${firstLineHeight}px repeat(${
                endTime - startTime + 1
            }, ${timeSlotHeight}px)`}
            gap={gap}
        >
            {range(startTime, endTime).map((hour) => (
                <Box
                    gridRow={`${hour - startTime + 2} / ${
                        hour - startTime + 3
                    }`}
                    textAlign="right"
                    fontWeight="bold"
                >
                    {hour}
                </Box>
            ))}
        </Grid>
    );
};
