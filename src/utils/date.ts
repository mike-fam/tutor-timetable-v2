import startOfISOWeek from "date-fns/startOfISOWeek";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import { IsoDay, IsoDayFormatting } from "../types/date";
import parse from "date-fns/parse";
import getISODay from "date-fns/getISODay";

/**
 * Converts an iso week day number to the name of that week day
 *
 * @param {IsoDay} isoDay ISO number representation of a week day
 * @param {IsoDayFormatting} isoDayFormat format to display the day in, see date-fns format documentation
 * @returns {string} the day of a week in the given format
 */
export const isoNumberToDay = (
    isoDay: IsoDay,
    isoDayFormat: IsoDayFormatting = "iii"
): string => {
    const monday = startOfISOWeek(new Date());
    const weekDay = addDays(monday, isoDay - 1);
    return format(weekDay, isoDayFormat);
};

export const dayToIsoNumber = (
    day: string,
    formatString: string = "EEE"
): IsoDay => {
    const date = parse(day, formatString, new Date());
    return getISODay(date) as IsoDay;
};

export const timeStringToHours = (
    timeString: string,
    formatString: string = "HH:mm"
): number => {
    const date = parse(timeString, formatString, new Date());
    return date.getHours() + date.getMinutes() / 60;
};