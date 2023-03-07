import { Box, Grid, HStack, IconButton, Stack } from "@chakra-ui/react";
import {
    PropsWithChildren,
    ReactElement,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { Props as DayProps } from "./Day";
import { gap, timetableTimeslotHeight } from "../../constants/timetable";
import { HourColumn } from "./HourColumn";
import { IsoDay } from "../../../types/date";
import { TimetableSessionType } from "../../types/timetable";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export type Props<T> = {
    displayedDays?: Array<IsoDay>;
    renderDay: (
        dayProps: Omit<
            DayProps<T>,
            "renderTimeSlot" | "renderSession" | "getSessionProps"
        >,
        key: number
    ) => ReactElement<DayProps<T>>;
    startTime?: number;
    endTime?: number;
    sessions: Array<TimetableSessionType>;
    timeslotHeight?: number;
};

export const Timetable = <T,>({
    displayedDays = [1, 2, 3, 4, 5, 6, 7],
    startTime = 7,
    endTime = 20,
    renderDay,
    sessions,
    timeslotHeight = timetableTimeslotHeight,
}: PropsWithChildren<Props<T>>) => {
    const [firstDisplayedDayIndex, setFirstDisplayedDayIndex] = useState(0);
    const gridRef = useRef<HTMLDivElement>(null);
    const [columnCount, setColumnCount] = useState(0);
    useEffect(() => {
        if (gridRef.current) {
            setColumnCount(
                Math.min(
                    Math.floor(gridRef.current.clientWidth / 150),
                    displayedDays.length
                )
            );
        }
        window.onresize = () => {
            if (gridRef.current) {
                setColumnCount(
                    Math.min(
                        Math.floor(gridRef.current.clientWidth / 150),
                        displayedDays.length
                    )
                );
            }
        };
    }, [displayedDays.length]);
    return (
        <Stack>
            {columnCount < displayedDays.length && (
                <HStack justify="space-between">
                    <IconButton
                        variant="ghost"
                        disabled={firstDisplayedDayIndex === 0}
                        icon={<ChevronLeftIcon />}
                        aria-label="previous-day"
                        onClick={() =>
                            setFirstDisplayedDayIndex((prev) => prev - 1)
                        }
                    />
                    <IconButton
                        variant="ghost"
                        disabled={
                            firstDisplayedDayIndex === displayedDays.length - 1
                        }
                        icon={<ChevronRightIcon />}
                        aria-label="next-day"
                        onClick={() =>
                            setFirstDisplayedDayIndex((prev) => prev + 1)
                        }
                    />
                </HStack>
            )}
            <Grid
                ref={gridRef}
                templateColumns={`2ch repeat(${columnCount}, 1fr)`}
                templateRows="1fr"
                overflowY="hidden"
                autoRows="0px"
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
        </Stack>
    );
};
