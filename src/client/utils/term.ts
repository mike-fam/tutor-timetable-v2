import isBefore from "date-fns/isBefore";
import startOfISOWeek from "date-fns/startOfISOWeek";
import isAfter from "date-fns/isAfter";
import maxBy from "lodash/maxBy";
import differenceInWeeks from "date-fns/differenceInWeeks";
import { TermResponseType } from "../types/term";
import { today } from "../constants/date";
import { TermType } from "../generated/graphql";
import { sentenceCase } from "change-case";

export const getCurrentTerm = (terms: Array<TermResponseType>) => {
    // Choose current term by default
    for (const term of terms) {
        if (isBefore(today, term.endDate) && isAfter(today, term.startDate)) {
            return term;
        }
    }
    // no suitable term, set chosen term to the latest.
    return maxBy(terms, (term) => term.startDate)!;
};

export const getWeeksNum = (term?: TermResponseType) => {
    if (!term) {
        return 0;
    }
    return differenceInWeeks(term.endDate, term.startDate);
};

export const getCurrentWeek = (term?: TermResponseType) => {
    if (!term) {
        return 0;
    }
    return differenceInWeeks(
        startOfISOWeek(today),
        startOfISOWeek(term.startDate)
    );
};

export const formatTerm = (term: { type: TermType; year: number }) =>
    `${sentenceCase(term.type)}, ${term.year}`;
