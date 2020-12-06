import { Box, Grid } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { IsoDayNumber } from "../../../types/date";
import { Props as DayProps } from "./Day";
import { gap } from "../../constants/timetable";
import { HourColumn } from "./HourColumn";

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
                templateColumns={`2ch repeat(${displayedDays.length}, 1fr)`}
                gap={gap}
            >
                <HourColumn startTime={startTime} endTime={endTime} />
                {displayedDays.map((day) =>
                    renderDay({ startTime, endTime, day })
                )}
            </Grid>
        </Box>
    );
};
