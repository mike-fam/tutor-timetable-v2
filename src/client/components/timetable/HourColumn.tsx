import { FC } from "react";
import { firstLineHeight, gap } from "../../constants/timetable";
import range from "lodash/range";
import { Box, Grid } from "@chakra-ui/react";

type Props = {
    startTime: number;
    endTime: number;
    timeslotHeight: number;
};

export const HourColumn: FC<Props> = ({
    startTime,
    endTime,
    timeslotHeight,
}) => {
    return (
        <Grid
            templateRows={`${firstLineHeight}px repeat(${
                endTime - startTime
            }, ${timeslotHeight}px)`}
            gap={gap}
            mt="auto"
        >
            {range(startTime, endTime).map((hour, key) => (
                <Box
                    gridRow={`${hour - startTime + 2} / ${
                        hour - startTime + 3
                    }`}
                    textAlign="right"
                    fontWeight="bold"
                    key={key}
                >
                    {hour}
                </Box>
            ))}
        </Grid>
    );
};
