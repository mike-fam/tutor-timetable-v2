export const weeksPatternRepr = (weekNames: string[], weeks: number[]) => {
    const weekRanges: string[] = [];
    const sortedWeeks = [...weeks].sort((a, b) => a - b);
    sortedWeeks.push(Infinity);
    let lastWeek: number | undefined = undefined;
    let firstConsecutiveWeek: number | undefined = undefined;
    for (const week of sortedWeeks) {
        if (lastWeek === void 0 || firstConsecutiveWeek === void 0) {
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
