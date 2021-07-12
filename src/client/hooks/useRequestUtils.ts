import {
    useLazyQueryWithError,
    useMutationWithError,
} from "./useApolloHooksWithError";
import {
    RequestFormInputType,
    useCreateRequestMutation,
    useGetRequestByIdLazyQuery,
    useGetRequestsByTermIdLazyQuery,
} from "../generated/graphql";
import { createContext, useCallback, useEffect, useState } from "react";
import { RequestMap, RequestResponse, RequestUtil } from "../types/requests";
import { Map } from "immutable";
import { defaultStr } from "../constants";

export const RequestContext = createContext<RequestUtil>({
    requests: Map<string, RequestResponse>(),
    setRequests: () => {},
    fetchRequests: () => {},
    fetchRequestById: () => {},
    createNewRequest: () => {},
    loading: false,
});

export const useRequestUtils = (): RequestUtil => {
    const [requests, setRequests] = useState<RequestMap>(
        Map<string, RequestResponse>()
    );
    const [getRequests, { data: requestsData, loading: multipleLoading }] =
        useLazyQueryWithError(useGetRequestsByTermIdLazyQuery, {});
    const [getRequestById, { data: requestData, loading: singleLoading }] =
        useLazyQueryWithError(useGetRequestByIdLazyQuery, {});
    const [
        createNewRequestMutation,
        { data: newRequestData, loading: newLoading },
    ] = useMutationWithError(useCreateRequestMutation, {});
    const fetchRequests = useCallback(
        (termId: string) => {
            if (termId === defaultStr) {
                return;
            }
            getRequests({
                variables: {
                    termId,
                },
            });
        },
        [getRequests]
    );
    const fetchRequestById = useCallback(
        (requestId: string) => {
            getRequestById({
                variables: {
                    requestId,
                },
            });
        },
        [getRequestById]
    );
    const createNewRequest = useCallback(
        (requestInput: RequestFormInputType) => {
            createNewRequestMutation({
                variables: {
                    requestDetails: requestInput,
                },
            });
        },
        [createNewRequestMutation]
    );
    useEffect(() => {
        if (!requestsData) {
            return;
        }
        requestsData.getRequestsByTermId.forEach((request) => {
            setRequests((prev) => prev.set(request.id, request));
        });
    }, [requestsData]);
    useEffect(() => {
        if (!requestData) {
            return;
        }
        const request = requestData.getRequestById;
        setRequests((prev) => prev.set(request.id, request));
    }, [requestData]);
    useEffect(() => {
        if (!newRequestData) {
            return;
        }
        const newRequest = newRequestData.createRequest;
        setRequests((prev) => prev.set(newRequest.id, newRequest));
    }, [newRequestData]);
    return {
        setRequests,
        requests,
        createNewRequest,
        fetchRequests,
        fetchRequestById,
        loading: multipleLoading || singleLoading || newLoading,
    };
};
