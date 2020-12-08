import { Box, Grid } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { IsoDayNumber } from "../../../types/date";
import { Props as DayProps } from "./Day";
import { gap } from "../../constants/timetable";
import { HourColumn } from "./HourColumn";

// TODO: hardcoded type
export type SessionType = {
    id: string;
    name: string;
    startTime: number;
    endTime: number;
    day: IsoDayNumber;
};

type Props = {
    displayedDays: IsoDayNumber[];
    renderDay: (
        dayProps: Omit<DayProps, "renderTimeSlot" | "renderSession">,
        key: number
    ) => ReactElement;
    startTime?: number;
    endTime?: number;
    sessions: Array<SessionType>;
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
                templateColumns={`2ch repeat(${displayedDays.length}, 1fr)`}
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
