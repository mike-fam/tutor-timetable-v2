import isBefore from "date-fns/isBefore";
import { parseISO } from "date-fns";
import isAfter from "date-fns/isAfter";
import maxBy from "lodash/maxBy";
import differenceInWeeks from "date-fns/differenceInWeeks";
import { TermResponseType } from "../types/term";

export const getCurrentTerm = (terms: Array<TermResponseType>) => {
    const today = new Date();
    // Choose current term by default
    for (const term of terms) {
        if (
            isBefore(today, parseISO(term.endDate)) &&
            isAfter(today, parseISO(term.startDate))
        ) {
            return term;
        }
    }
    // no suitable term, set chosen term to the latest.
    return maxBy(terms, (term) => parseISO(term.startDate))!;
};

export const getWeeksNum = (term?: TermResponseType) => {
    if (!term) {
        return 0;
    }
    return differenceInWeeks(parseISO(term.endDate), parseISO(term.startDate));
};

export const getCurrentWeek = (term?: TermResponseType) => {
    if (!term) {
        return 0;
    }
    return differenceInWeeks(new Date(), parseISO(term.startDate));
};
