import { Grid, HStack, IconButton, Stack } from "@chakra-ui/react";
import {
    PropsWithChildren,
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Props as DayProps } from "./Day";
import { gap, timetableTimeslotHeight } from "../../constants/timetable";
import { HourColumn } from "./HourColumn";
import { IsoDay } from "../../../types/date";
import { TimetableSessionType } from "../../types/timetable";
import getISODay from "date-fns/getISODay";
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
    const [columnCount, setColumnCount] = useState(0);
    const [displayedDaysTrimmed, setDisplayedDaysTrimmed] =
        useState(displayedDays);
    const [columnOffset, setColumnOffset] = useState(0);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const updateColumnCount = useCallback(
        (node: HTMLDivElement) => {
            setColumnCount(
                Math.min(
                    Math.floor(node.clientWidth / 150),
                    displayedDays.length
                )
            );
            setColumnOffset(0);
        },
        [displayedDays.length]
    );

    const columnCountRef = useCallback(
        (node: HTMLDivElement) => {
            if (node !== null) {
                // Initialise column count
                updateColumnCount(node);

                // Initialise offset
                const todaysDay = getISODay(new Date());
                setColumnOffset(
                    Math.min(
                        Math.max(
                            displayedDays.findIndex(
                                (value) => value >= todaysDay
                            ),
                            0
                        ),
                        displayedDays.length -
                            Math.min(
                                Math.floor(node.clientWidth / 150),
                                displayedDays.length
                            )
                    )
                );

                // Create a new ResizeObserver
                resizeObserverRef.current = new ResizeObserver(() => {
                    updateColumnCount(node);
                });

                // Observe size changes of the div
                resizeObserverRef.current.observe(node);
            } else if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        },
        [updateColumnCount, displayedDays]
    );
    useEffect(() => {
        setDisplayedDaysTrimmed(
            displayedDays.slice(columnOffset, columnOffset + columnCount)
        );
    }, [displayedDays, columnCount, columnOffset]);
    return (
        <Stack>
            {columnCount < displayedDays.length && (
                <HStack justify="space-between">
                    <IconButton
                        variant="ghost"
                        isRound
                        isDisabled={columnOffset === 0}
                        icon={<ChevronLeftIcon />}
                        aria-label="previous-day"
                        onClick={() => setColumnOffset((prev) => prev - 1)}
                    />
                    <IconButton
                        variant="ghost"
                        isRound
                        isDisabled={
                            columnOffset === displayedDays.length - columnCount
                        }
                        icon={<ChevronRightIcon />}
                        aria-label="next-day"
                        onClick={() => setColumnOffset((prev) => prev + 1)}
                    />
                </HStack>
            )}
            <Grid
                ref={columnCountRef}
                templateColumns={`2ch repeat(${displayedDaysTrimmed.length}, 1fr)`}
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
                {displayedDaysTrimmed.map((day, key) =>
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
