import {
    firstLineHeight,
    realGap,
    timeSlotHeight,
} from "../constants/timetable";
import { StackInfo, TimeRange } from "../../types/date";
import { Props as SessionProps } from "../components/timetable/Session";
import * as CSS from "csstype";

/**
 * Convert session properties to CSS properties in an object that's suitable for react styling
 * @param startTime: Session start time, in hours
 * @param endTime: Session end time, in hours
 * @param startDay: start hour of day, as int
 * @param endDay: end hour of day, as int
 * @param stackSize: number of clashing sessions
 * @param stackIndex: index of this session relative to other clashing sessions
 */
export const sessionStyleFromProps = ({
    startTime,
    endTime,
    startDay,
    endDay,
    stackSize,
    stackIndex,
}: Omit<SessionProps, "name">): {
    top: CSS.Property.Top<number>;
    height: CSS.Property.Height<number>;
    display: CSS.Property.Display;
    width: CSS.Property.Width;
    left: CSS.Property.Left;
} => {
    // Which time slot does this start from? 0th, 1st, 2nd or 3rd, etc.
    const relativeStart = Math.max(Math.min(startTime, endDay) - startDay, 0);

    // Which time slot does this end on? 0th, 1st, 2nd or 3rd, etc.
    const relativeEnd = Math.max(Math.min(endTime, endDay) - startDay, 0);

    // Top Pixel
    const top =
        firstLineHeight + realGap + relativeStart * (timeSlotHeight + realGap);
    const sessionDuration = relativeEnd - relativeStart;
    const height =
        sessionDuration * timeSlotHeight +
        Math.max(Math.ceil(sessionDuration - 1), 0) * realGap;
    const display = sessionDuration ? "block" : "none";
    const width = `calc((100% - ${
        (stackSize - 1) * realGap
    }px) / ${stackSize})`;
    const left = `calc(((100% - ${
        (stackSize - 1) * realGap
    }px) / ${stackSize} + ${realGap}px) * ${stackIndex})`;
    return { top: `${top}px`, height, display, width, left };
};

/**
 * Return all ranges with clashed information
 * 2 ranges clash if a range starts later than the other's start, but earlier than its end.
 * @param ranges: array of ranges. A range is an array with the structure [id, start, end]
 * @returns array of objects holding clashed info. Each object has the following structure
 *      {
 *          stacked: int,
 *          stackIndex: int
 *      }
 *      where stacked represents the number of ranges this range clashes with
 *            stackIndex represents the index of this range relative to its clashing range.
 */
export const getClashedRanges = (
    ranges: Array<TimeRange>
): { [key: string]: StackInfo } => {
    ranges.sort(({ start: start1, end: end1 }, { start: start2, end: end2 }) =>
        start1 - start2 !== 0 ? start1 - start2 : end1 - end2
    );
    let lastEnd = 0;
    const clashedIds: Array<string> = [];
    const result: { [key: string]: StackInfo } = {};
    for (const { id, start, end } of ranges) {
        // no crashing at this entry
        if (start >= lastEnd) {
            // Save all found classing ranges to result
            clashedIds.forEach((clashedId, i) => {
                result[clashedId] = {
                    stackSize: clashedIds.length,
                    stackIndex: i,
                };
            });
            // Clear current clashing ranges
            clashedIds.length = 0;
        }
        // Push current id to be checked at next iteration, regardless if this range clashes or not
        clashedIds.push(id);
        lastEnd = end;
    }
    // Last iteration, save last clashing ranges to result
    clashedIds.forEach((clashedId, i) => {
        result[clashedId] = {
            stackSize: clashedIds.length,
            stackIndex: i,
        };
    });
    return result;
};
