import { QueryHookOptions, QueryResult } from "@apollo/client";
import { useContext, useEffect, useMemo } from "react";
import { ErrorContext } from "../utils/errors";

export const useQueryWithError = <T, S>(
    useApolloQuery: (baseOptions: QueryHookOptions<T, S>) => QueryResult<T, S>,
    args: S
) => {
    const queryResult = useApolloQuery({ variables: args });
    const { addError } = useContext(ErrorContext);
    const { error } = useMemo(() => queryResult, [queryResult]);
    useEffect(() => {
        if (error) {
            addError(error);
        }
    }, [error, addError]);
    return queryResult;
};
