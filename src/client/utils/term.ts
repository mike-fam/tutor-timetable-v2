import isBefore from "date-fns/isBefore";
import { parseISO } from "date-fns";
import isAfter from "date-fns/isAfter";
import maxBy from "lodash/maxBy";
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
