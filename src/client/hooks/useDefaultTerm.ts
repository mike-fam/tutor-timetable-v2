import { useEffect, useState } from "react";
import { defaultInt, defaultStr } from "../constants";
import { useQueryWithError } from "./useApolloHooksWithError";
import { TermQuery, useTermsQuery } from "../generated/graphql";
import { getCurrentTerm, getCurrentWeek } from "../utils/term";
import { today } from "../constants/date";

export const useDefaultTerm = () => {
    const [chosenTermId, setChosenTermId] = useState(defaultStr);
    const [chosenWeek, setChosenWeek] = useState(defaultInt);
    const { data: termsData, loading: termsLoading } = useQueryWithError(
        useTermsQuery,
        {}
    );
    const [chosenTerm, setChosenTerm] = useState<TermQuery["term"]>();
    useEffect(() => {
        // Loading
        if (termsLoading) {
            return;
        }
        // possibly an error happened
        if (!termsData) {
            return;
        }
        // No term date yet.
        if (termsData.terms.length === 0) {
            return;
        }
        const chosenTerm = getCurrentTerm(termsData.terms);
        setChosenTerm(chosenTerm);
        // choose current week if current term found
        setChosenTermId(chosenTerm.id);
        const startDate = chosenTerm.startDate;
        const endDate = chosenTerm.endDate;
        // Choose current week if possible, otherwise choose "All weeks"
        setChosenWeek(
            startDate < today && today < endDate
                ? getCurrentWeek(chosenTerm)
                : defaultInt
        );
    }, [termsLoading, termsData]);
    return {
        chosenTermId,
        setChosenTermId,
        chosenWeek,
        setChosenWeek,
        termsData,
        termsLoading,
        chosenTerm,
        setChosenTerm,
    };
};
