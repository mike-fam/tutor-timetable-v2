import { Grid, Text } from "@chakra-ui/react";
import React, { PropsWithChildren, ReactElement, useMemo } from "react";
import range from "lodash/range";
import { IsoDay } from "../../../types/date";
import { isoNumberToDay } from "../../../utils/date";
import { firstLineHeight, gap } from "../../constants/timetable";
import { Props as SessionProps } from "./Session";
import { getClashedRanges } from "../../utils/timetable";
import { TimetableSessionType } from "../../types/timetable";

export type Props<T> = {
    day: IsoDay;
    startTime: number;
    endTime: number;
    renderTimeSlot: (key: number, time: number, day: number) => ReactElement;
    sessions: Array<TimetableSessionType>;
    getSessionProps: (sessionId: number) => T;
    renderSession: (
        sessionProps: SessionProps,
        key: number,
        moreProps: T
    ) => ReactElement<SessionProps & T>;
    timeslotHeight: number;
};

export const Day = <T,>({
    day,
    startTime,
    endTime,
    sessions,
    renderTimeSlot,
    renderSession,
    getSessionProps,
    timeslotHeight,
}: PropsWithChildren<Props<T>>) => {
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
            }, ${timeslotHeight}px)`}
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
                        timeslotHeight,
                        ...stackInfo[session.id],
                    },
                    key,
                    getSessionProps(session.id)
                )
            )}
        </Grid>
    );
};
