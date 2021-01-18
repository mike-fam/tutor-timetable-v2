import { Grid, Text } from "@chakra-ui/react";
import React, { ReactElement, useMemo } from "react";
import range from "lodash/range";
import { IsoDay } from "../../../types/date";
import { isoNumberToDay } from "../../../utils/date";
import {
    firstLineHeight,
    gap,
    timeSlotHeight,
} from "../../constants/timetable";
import { Props as SessionProps } from "./Session";
import { getClashedRanges } from "../../utils/timetable";
import { Props as TimetableProps } from "./Timetable";

export type Props = {
    day: IsoDay;
    startTime: number;
    endTime: number;
    renderTimeSlot: (key: number, time: number, day: number) => ReactElement;
    sessions: TimetableProps["sessions"];
    renderSession: (sessionProps: SessionProps, key: number) => ReactElement;
};

export const Day: React.FunctionComponent<Props> = ({
    day,
    startTime,
    endTime,
    sessions,
    renderTimeSlot,
    renderSession,
}) => {
    const stackInfo = useMemo(
        () =>
            getClashedRanges(
                sessions.map((session) => ({
                    id: session.id,
                    start: session.startTime,
                    end: session.endTime,
                }))
            ),
        [sessions]
    );
    return (
        <Grid
            templateRows={`${firstLineHeight}px repeat(${
                endTime - startTime
            }, ${timeSlotHeight}px)`}
            gap={gap}
            pos="relative"
        >
            <Text fontWeight="bold">{isoNumberToDay(day).toUpperCase()}</Text>
            {range(startTime, endTime).map((time, index) =>
                renderTimeSlot(index, time, day)
            )}
            {sessions.map((session, key) =>
                renderSession(
                    {
                        id: session.id,
                        startTime: session.startTime,
                        endTime: session.endTime,
                        startDay: startTime,
                        endDay: endTime,
                        name: session.name,
                        ...stackInfo[session.id],
                    },
                    key
                )
            )}
        </Grid>
    );
};
