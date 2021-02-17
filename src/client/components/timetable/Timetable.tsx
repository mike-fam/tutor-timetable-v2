import { Box, Grid } from "@chakra-ui/react";
import React, { PropsWithChildren, ReactElement } from "react";
import { Props as DayProps } from "./Day";
import { gap, timetableTimeslotHeight } from "../../constants/timetable";
import { HourColumn } from "./HourColumn";
import { IsoDay } from "../../../types/date";
import { TimetableSessionType } from "../../types/timetable";

export type Props<T> = {
    displayedDays: Array<IsoDay>;
    renderDay: (
        dayProps: Omit<
            DayProps<T>,
            "renderTimeSlot" | "renderSession" | "getSessionProps"
        >,
        key: number
    ) => ReactElement;
    startTime?: number;
    endTime?: number;
    sessions: Array<TimetableSessionType>;
    timeslotHeight?: number;
};

export const Timetable = <T,>({
    displayedDays,
    startTime = 7,
    endTime = 20,
    renderDay,
    sessions,
    timeslotHeight = timetableTimeslotHeight,
}: PropsWithChildren<Props<T>>) => {
    return (
        <Box>
            <Grid
                templateColumns={`2ch repeat(${displayedDays.length}, 1fr)`}
                gap={gap}
            >
                <HourColumn
                    startTime={startTime}
                    endTime={endTime}
                    timeslotHeight={timeslotHeight}
                />
                {displayedDays.map((day, key) =>
                    renderDay(
                        {
                            startTime,
                            endTime,
                            day,
                            sessions: sessions.filter(
                                (session) => session.day === day
                            ),
                            timeslotHeight,
                        },
                        key
                    )
                )}
            </Grid>
        </Box>
    );
};
