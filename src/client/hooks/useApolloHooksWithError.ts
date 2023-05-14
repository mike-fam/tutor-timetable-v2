import * as Apollo from "@apollo/client";
import {
    ApolloError,
    LazyQueryHookOptions,
    MutationHookOptions,
    MutationTuple,
    QueryHookOptions,
    QueryResult,
    QueryTuple,
} from "@apollo/client";
import { useContext, useEffect, useMemo } from "react";
import { FeedbackContext } from "../utils/errors";
import { OperationVariables } from "@apollo/client/core";

export const useQueryWithError = <
    T,
    S extends OperationVariables = OperationVariables
>(
    useApolloQuery: (baseOptions?: QueryHookOptions<T, S>) => QueryResult<T, S>,
    baseOptions?: QueryHookOptions<T, S>
) => {
    const queryResult = useApolloQuery(baseOptions);
    const { addError } = useContext(FeedbackContext);
    const { error } = useMemo(() => queryResult, [queryResult]);
    useEffect(() => {
        if (error) {
            addError(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);
    return queryResult;
};

export const useMutationWithError = <
    T,
    S extends OperationVariables = OperationVariables
>(
    useApolloMutation: (
        baseOptions?: MutationHookOptions<T, S>
    ) => MutationTuple<T, S>,
    baseOptions?: MutationHookOptions<T, S>
) => {
    const mutationResult = useApolloMutation(baseOptions);
    const { addError } = useContext(FeedbackContext);
    const [, { error }] = useMemo(() => mutationResult, [mutationResult]);
    useEffect(() => {
        if (error) {
            addError(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);
    return mutationResult;
};

export const useMutationWithStatus = <
    T,
    S extends OperationVariables = OperationVariables
>(
    useApolloMutation: (
        baseOptions?: MutationHookOptions<T, S>
    ) => MutationTuple<T, S>,
    baseOptions?: MutationHookOptions<T, S>,
    successMessage?: { title: string; description: string }
) => {
    const mutationResult = useMutationWithError(useApolloMutation, baseOptions);
    const { addSuccess } = useContext(FeedbackContext);
    const [, { data }] = useMemo(() => mutationResult, [mutationResult]);
    useEffect(() => {
        if (data) {
            addSuccess(successMessage?.title, successMessage?.description);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, successMessage]);
    return mutationResult;
};

export const useLazyQueryWithError = <
    T,
    S extends OperationVariables = OperationVariables
>(
    useApolloLazyQuery: (
        baseOptions?: Apollo.LazyQueryHookOptions<T, S>
    ) => QueryTuple<T, S>,
    baseOptions: LazyQueryHookOptions<T, S>
) => {
    const queryResult = useApolloLazyQuery(baseOptions);
    const { addError } = useContext(FeedbackContext);
    const [, { error }] = useMemo(() => queryResult, [queryResult]);
    useEffect(() => {
        if (error) {
            addError(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);
    return queryResult;
};

export const useSubscriptionWithError = <
    T,
    S extends OperationVariables = OperationVariables
>(
    useApolloSubscription: (
        baseOptions: Apollo.SubscriptionHookOptions<T, S>
    ) => {
        variables?: S;
        loading: boolean;
        data?: T | undefined;
        error?: ApolloError | undefined;
    },
    baseOptions: Apollo.SubscriptionHookOptions<T, S>
) => {
    const subscriptionResult = useApolloSubscription(baseOptions);
    const { addError } = useContext(FeedbackContext);
    const { error } = useMemo(() => subscriptionResult, [subscriptionResult]);
    useEffect(() => {
        if (error) {
            addError(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);
    return subscriptionResult;
};
