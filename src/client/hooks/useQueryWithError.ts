import * as Apollo from "@apollo/client";
import {
    MutationHookOptions,
    MutationTuple,
    QueryHookOptions,
    QueryResult,
    QueryTuple,
} from "@apollo/client";
import { useContext, useEffect, useMemo } from "react";
import { ErrorContext } from "../utils/errors";

export const useQueryWithError = <T, S>(
    useApolloQuery: (baseOptions: QueryHookOptions<T, S>) => QueryResult<T, S>,
    args?: S
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

export const useMutationWithError = <T, S>(
    useApolloMutation: (
        baseOptions: MutationHookOptions<T, S>
    ) => MutationTuple<T, S>,
    args?: S
) => {
    const mutationResult = useApolloMutation({ variables: args });
    const { addError } = useContext(ErrorContext);
    const [, { error }] = useMemo(() => mutationResult, [mutationResult]);
    useEffect(() => {
        if (error) {
            addError(error);
        }
    }, [error, addError]);
    return mutationResult;
};

export const useLazyQueryWithError = <T, S>(
    useApolloLazyQuery: (
        baseOptions?: Apollo.LazyQueryHookOptions<T, S>
    ) => QueryTuple<T, S>,
    args?: S
) => {
    const queryResult = useApolloLazyQuery({
        variables: args,
        errorPolicy: "all",
    });
    const { addError } = useContext(ErrorContext);
    const [, { error }] = useMemo(() => queryResult, [queryResult]);
    useEffect(() => {
        if (error) {
            addError(error);
        }
    }, [error, addError]);
    return queryResult;
};
