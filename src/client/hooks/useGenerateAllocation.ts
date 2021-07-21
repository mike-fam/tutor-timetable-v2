import { useMutationWithError } from "./useApolloHooksWithError";
import {
    AllocationStatus,
    useRequestAllocationMutation,
} from "../generated/graphql";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";

export const useRequestAllocation = () => {
    const [requestAllocationMutation, { data: requestAllocationData }] =
        useMutationWithError(useRequestAllocationMutation, {
            errorPolicy: "all",
        });
    const toast = useToast();
    useEffect(() => {
        if (!requestAllocationData) {
            return;
        }
        const allocationResult = requestAllocationData.requestAllocation;
        if (allocationResult.status === AllocationStatus.Error) {
            toast({
                status: "error",
                title: "Allocation Error",
                description: allocationResult.message,
                duration: null,
                isClosable: true,
            });
        } else if (allocationResult.status === AllocationStatus.Requested) {
            toast({
                status: "info",
                title: "Allocation Requested",
                description: allocationResult.message,
                duration: null,
                isClosable: true,
            });
        } else if (allocationResult.status === AllocationStatus.Generated) {
            toast({
                status: "success",
                title: "Allocation Generated",
                description: allocationResult.message,
                duration: null,
                isClosable: true,
            });
        } else if (allocationResult.status === AllocationStatus.NotReady) {
            toast({
                status: "info",
                title: "Allocation Not Yet Ready",
                description: allocationResult.message,
                duration: null,
                isClosable: true,
            });
        }
    }, [toast, requestAllocationData]);
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
    return [
        requestAllocation,
        requestAllocationData?.requestAllocation.allocatedStreams,
    ] as const;
};
