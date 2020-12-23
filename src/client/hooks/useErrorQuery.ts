import { ApolloError, QueryHookOptions, QueryResult } from "@apollo/client";
import { Exact } from "../generated/graphql";
import { useContext, useEffect, useMemo } from "react";
import { ErrorContext } from "../utils/errors";

export const useErrorQuery = <T>(
    useApolloQuery: (
        baseOptions?:
            | QueryHookOptions<T, Exact<{ [p: string]: never }>>
            | undefined
    ) => QueryResult<T, Exact<{ [p: string]: never }>>
) => {
    const queryResult = useApolloQuery();
    const { addError } = useContext(ErrorContext);
    const { error } = useMemo(() => queryResult, [queryResult]);
    useEffect(() => {
        if (error) {
            addError(error);
        }
    }, [error, addError]);
    return queryResult;
};
