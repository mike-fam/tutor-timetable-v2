import {
    useLazyQueryWithError,
    useMutationWithError,
} from "./useApolloHooksWithError";
import {
    AllocationStatus,
    RequestAllocationMutation,
    useCheckAllocationLazyQuery,
    useRequestAllocationMutation,
} from "../generated/graphql";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

type AllocationResultType = RequestAllocationMutation["requestAllocation"];

export const useAllocationQueries = () => {
    const [requestAllocationMutation, { data: requestAllocationData }] =
        useMutationWithError(useRequestAllocationMutation, {
            errorPolicy: "all",
        });
    const [checkAllocationQuery, { data: checkAllocationData }] =
        useLazyQueryWithError(useCheckAllocationLazyQuery, {
            errorPolicy: "all",
            fetchPolicy: "network-only",
        });
    const [allocationResult, setAllocationResult] =
        useState<AllocationResultType["allocatedStreams"]>();
    const toast = useToast();
    useEffect(() => {
        if (requestAllocationData?.requestAllocation) {
            setAllocationResult(
                requestAllocationData.requestAllocation.allocatedStreams
            );
        }
    }, [requestAllocationData]);
    useEffect(() => {
        if (checkAllocationData?.checkAllocation) {
            setAllocationResult(
                checkAllocationData.checkAllocation.allocatedStreams
            );
        }
    }, [checkAllocationData]);
    const displayMessage = useCallback(
        (allocationResult: AllocationResultType) => {
            const toastDisplay = {
                title: allocationResult.title,
                description: allocationResult.message,
                duration: 10000,
                isClosable: true,
            };
            if (allocationResult.type === AllocationStatus.Error) {
                toast({
                    status: "error",
                    ...toastDisplay,
                });
            } else if (allocationResult.type === AllocationStatus.Requested) {
                toast({
                    status: "success",
                    ...toastDisplay,
                });
            } else if (allocationResult.type === AllocationStatus.Generated) {
                toast({
                    status: "success",
                    ...toastDisplay,
                });
            } else if (allocationResult.type === AllocationStatus.NotReady) {
                toast({
                    status: "info",
                    ...toastDisplay,
                });
            }
        },
        [toast]
    );
    useEffect(() => {
        if (!requestAllocationData) {
            return;
        }
        displayMessage(requestAllocationData.requestAllocation);
    }, [toast, requestAllocationData, displayMessage]);
    useEffect(() => {
        if (!checkAllocationData) {
            return;
        }
        displayMessage(checkAllocationData.checkAllocation);
    }, [toast, checkAllocationData, displayMessage]);
    const requestAllocation = useCallback(
        (
            courseId: string,
            termId: string,
            staffIds: string[],
            timeout: number
        ) => {
            requestAllocationMutation({
                variables: {
                    requestAllocationInput: {
                        courseId,
                        termId,
                        staffIds,
                        timeout,
                    },
                },
            });
        },
        [requestAllocationMutation]
    );
    const checkAllocation = useCallback(
        (courseId: string, termId: string) => {
            checkAllocationQuery({
                variables: {
                    timetableInput: {
                        courseId,
                        termId,
                    },
                },
            });
        },
        [checkAllocationQuery]
    );
    return {
        requestAllocation,
        checkAllocation,
        allocationResult,
    };
};
