import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";
import range from "lodash/range";
import { IsoDayNumber } from "../../../types/date";
import { isoNumberToDay } from "../../../utils/date";
import { timeSlotHeight } from "../../constants/timetable";

export type Props = {
    day: IsoDayNumber;
    startTime: number;
    endTime: number;
};

export const Day: React.FunctionComponent<Props> = ({
    day,
    startTime,
    endTime,
}) => {
    return (
        // + 1 for Day Heading
        <Grid
            templateRows={`1em repeat(${
                endTime - startTime + 1
            }, ${timeSlotHeight}px)`}
            gap={2}
        >
            <Box>{isoNumberToDay(day).toUpperCase()}</Box>
            {range(startTime, endTime).map((hour) => (
                <Box bg="tomato">Test</Box>
            ))}
        </Grid>
    );
};
