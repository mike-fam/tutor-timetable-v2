import { useLazyQueryWithError } from "./useApolloHooksWithError";
import { useTermLazyQuery } from "../generated/graphql";
import { useEffect, useMemo } from "react";
import { getCurrentWeek, getWeeksNum } from "../utils/term";
import { TermResponseType } from "../types/term";

type TermData = {
    chosenTerm: TermResponseType | undefined;
    currentWeek: number;
    weekNum: number;
};

export const useTermMetadata = (chosenTermId?: string): TermData => {
    const [fetchTerm, { data }] = useLazyQueryWithError(useTermLazyQuery, {});
    useEffect(() => {
        if (!chosenTermId) {
            return;
        }
        fetchTerm({
            variables: {
                termId: chosenTermId,
            },
        });
    }, [chosenTermId, fetchTerm]);
    const currentWeek = useMemo(() => getCurrentWeek(data?.term), [data?.term]);
    const weekNum = useMemo(() => getWeeksNum(data?.term), [data?.term]);
    return {
        chosenTerm: data?.term,
        currentWeek,
        weekNum,
    };
};
