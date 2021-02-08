import { useQueryWithError } from "./useQueryWithError";
import { useTermQuery } from "../generated/graphql";
import { useMemo } from "react";
import { getCurrentWeek, getWeeksNum } from "../utils/term";
import { TermResponseType } from "../types/term";

type TermData = {
    chosenTerm: TermResponseType | undefined;
    currentWeek: number;
    weekNum: number;
};

export const useTermMetadata = (chosenTermId: number): TermData => {
    const { data } = useQueryWithError(useTermQuery, { termId: chosenTermId });
    const currentWeek = useMemo(() => getCurrentWeek(data?.term), [data?.term]);
    const weekNum = useMemo(() => getWeeksNum(data?.term), [data?.term]);
    return {
        chosenTerm: data?.term,
        currentWeek,
        weekNum,
    };
};
