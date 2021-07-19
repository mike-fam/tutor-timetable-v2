import keyBy from "lodash/keyBy";
import mapValues from "lodash/mapValues";
import {
    GetRootSessionStreamsQuery,
    StreamAllocationPattern,
} from "../generated/graphql";
import { ArrayElement } from "../types/helpers";

export const weeksPatternRepr = (weekNames: string[], weeks: number[]) => {
    const weekRanges: string[] = [];
    const sortedWeeks = [...weeks].sort((a, b) => a - b);
    sortedWeeks.push(Infinity);
    let lastWeek: number | undefined = undefined;
    let firstConsecutiveWeek: number | undefined = undefined;
    for (const week of sortedWeeks) {
        if (!lastWeek || !firstConsecutiveWeek) {
            lastWeek = firstConsecutiveWeek = week;
            continue;
        }
        if (week - 1 !== lastWeek) {
            let weekRange: string;
            if (firstConsecutiveWeek !== lastWeek) {
                weekRange = `${weekNames[firstConsecutiveWeek]} - ${weekNames[lastWeek]}`;
            } else {
                weekRange = `${weekNames[lastWeek]}`;
            }
            weekRanges.push(weekRange);
            firstConsecutiveWeek = week;
        }

        lastWeek = week;
    }
    return weekRanges.join(", ");
};

export const getStreamAllocationPattern = (
    stream: ArrayElement<GetRootSessionStreamsQuery["rootSessionStreams"]>
): StreamAllocationPattern[] => {
    const result: StreamAllocationPattern[] = [
        {
            weeks: stream.weeks,
            allocation: stream.allocatedUsers.map((user) => user.id),
        },
    ];
    result.push(
        ...stream.secondaryStreams.map((stream) => ({
            weeks: stream.weeks,
            allocation: stream.allocatedUsers.map((user) => user.id),
        }))
    );
    return result;
};
