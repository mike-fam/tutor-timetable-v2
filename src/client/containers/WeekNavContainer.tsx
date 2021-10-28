import React, { useContext, useEffect, useState } from "react";
import { WeekNav } from "../components/WeekNav";
import { Term, useTermsQuery } from "../generated/graphql";
import { useQueryWithError } from "../hooks/useApolloHooksWithError";
import { TimetableContext } from "../utils/timetable";
import differenceInWeeks from "date-fns/differenceInWeeks";
import { Map } from "immutable";

type Props = {};

// Placeholder data
export const WeekNavContainer: React.FunctionComponent<Props> = () => {
    const { chosenTermId, chosenWeek, chooseWeek } =
        useContext(TimetableContext);
    const { data, loading } = useQueryWithError(useTermsQuery, {});
    const [weeksNum, setWeeksNum] = useState(0);
    const [termMap, setTermMap] = useState(
        Map<string, Omit<Term, "timetables">>()
    );
    useEffect(() => {
        if (loading || !data) {
            return;
        }
        data.terms.forEach((term) => {
            setTermMap((prev) => prev.set(term.id, term));
        });
        const chosenTerm = termMap.get(chosenTermId);
        if (!chosenTerm) {
            return;
        }
        const { startDate, endDate } = chosenTerm;
        setWeeksNum(differenceInWeeks(endDate, startDate) + 1);
    }, [loading, data, chosenTermId, termMap]);
    return (
        <WeekNav
            weeksNum={weeksNum}
            chooseWeek={chooseWeek}
            chosenWeek={chosenWeek}
            weekNames={termMap.get(chosenTermId)?.weekNames || []}
        />
    );
};
