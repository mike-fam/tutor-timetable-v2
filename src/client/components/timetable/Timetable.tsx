import { Box, Grid } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Props as DayProps } from "./Day";
import { gap } from "../../constants/timetable";
import { HourColumn } from "./HourColumn";
import { Set } from "immutable";
import { IsoDay } from "../../../types/date";
import { TimetableSessionType } from "../../types/timetable";

export type Props = {
    displayedDays: Set<IsoDay>;
    renderDay: (
        dayProps: Omit<DayProps, "renderTimeSlot" | "renderSession">,
        key: number
    ) => ReactElement;
    startTime?: number;
    endTime?: number;
    sessions: Array<TimetableSessionType>;
};

export const Timetable: React.FC<Props> = ({
    displayedDays,
    startTime = 7,
    endTime = 20,
    renderDay,
    sessions,
}) => {
    return (
        <Box>
            <Grid
                templateColumns={`2ch repeat(${displayedDays.size}, 1fr)`}
                gap={gap}
            >
                <HourColumn startTime={startTime} endTime={endTime} />
                {displayedDays.map((day, key) =>
                    renderDay(
                        {
                            startTime,
                            endTime,
                            day,
                            sessions: sessions.filter(
                                (session) => session.day === day
                            ),
                        },
                        key
                    )
                )}
            </Grid>
        </Box>
    );
};
