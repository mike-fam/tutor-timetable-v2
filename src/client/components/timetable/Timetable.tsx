import { Box, Grid } from "@chakra-ui/react";
import range from "lodash/range";
import React, { ReactElement } from "react";
import { IsoDayNumber } from "../../../types/date";
import { Props as DayProps } from "./Day";
import {
    firstLineHeight,
    gap,
    timeSlotHeight,
} from "../../constants/timetable";

type Props = {
    displayedDays: IsoDayNumber[];
    renderDay: (dayProps: Omit<DayProps, "renderTimeSlot">) => ReactElement;
    startTime?: number;
    endTime?: number;
};

export const Timetable: React.FC<Props> = ({
    displayedDays,
    startTime = 7,
    endTime = 20,
    renderDay,
}) => {
    return (
        <Box>
            <Grid
                templateColumns={`1em repeat(${displayedDays.length}, 1fr)`}
                gap={gap}
            >
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
                {displayedDays.map((day) =>
                    renderDay({ startTime, endTime, day })
                )}
            </Grid>
        </Box>
    );
};
