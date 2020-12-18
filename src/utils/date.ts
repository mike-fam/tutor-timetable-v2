import startOfIsoWeek from "date-fns/startOfISOWeek";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import { IsoDayFormatting, IsoDay } from "../types/date";

/**
 * Converts an iso week day number to the name of that week day
 * @param isoDay ISO number representation of a week day
 * @param isoDayFormat format to display the day in, see date-fns format documentation
 */
export const isoNumberToDay = (
    isoDay: IsoDay,
    isoDayFormat: IsoDayFormatting = "iii"
): string => {
    const monday = startOfIsoWeek(new Date());
    const weekDay = addDays(monday, isoDay - 1);
    return format(weekDay, isoDayFormat);
};
