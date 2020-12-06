import { Grid, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import range from "lodash/range";
import { IsoDayNumber } from "../../../types/date";
import { isoNumberToDay } from "../../../utils/date";
import {
    firstLineHeight,
    gap,
    timeSlotHeight,
} from "../../constants/timetable";

export type Props = {
    day: IsoDayNumber;
    startTime: number;
    endTime: number;
    renderTimeSlot: () => ReactElement;
};

export const Day: React.FunctionComponent<Props> = ({
    day,
    startTime,
    endTime,
    renderTimeSlot,
}) => {
    return (
        // + 1 for Day Heading
        <Grid
            templateRows={`${firstLineHeight}px repeat(${
                endTime - startTime + 1
            }, ${timeSlotHeight}px)`}
            gap={gap}
        >
            <Text fontWeight="bold">{isoNumberToDay(day).toUpperCase()}</Text>
            {range(startTime, endTime).map(() => renderTimeSlot())}
        </Grid>
    );
};
