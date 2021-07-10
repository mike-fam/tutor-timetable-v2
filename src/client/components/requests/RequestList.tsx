import { Center, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { OfferRequestModalContainer } from "../../containers/requests/OfferRequestModalContainer";
import { RequestResponse } from "../../types/requests";
import { Loadable } from "../helpers/Loadable";
import { RequestTable } from "./RequestTable";
import { defaultStr } from "../../constants";
import { ViewMyRequestModalContainer } from "../../containers/requests/ViewMyRequestModalContainer";
import { useMutationWithError } from "../../hooks/useApolloHooksWithError";
import { useDeleteRequestMutation } from "../../generated/graphql";
import { RequestContext } from "../../hooks/useRequestUtils";

type Props = {
    requestList: Array<RequestResponse>;
    loading: boolean;
};

export const RequestList: React.FunctionComponent<Props> = ({
    requestList,
    loading,
}) => {
    const {
        isOpen: isOpenOffer,
        onClose: onCloseOffer,
        onOpen: onOpenOffer,
    } = useDisclosure();
    const {
        isOpen: isOpenRequestView,
        onClose: onCloseRequestView,
        onOpen: onOpenRequestView,
    } = useDisclosure();
    const toast = useToast();
    const { requests, setRequests } = useContext(RequestContext);
    const [selectedRequest, setSelectedRequest] = useState(defaultStr);
    const openOfferModal = useCallback(
        (requestId: string) => {
            setSelectedRequest(requestId);
            onOpenOffer();
        },
        [setSelectedRequest, onOpenOffer]
    );
    const openRequestView = useCallback(
        (requestId: string) => {
            setSelectedRequest(requestId);
            onOpenRequestView();
        },
        [setSelectedRequest, onOpenRequestView]
    );
    const [
        deleteRequestMutation,
        { data: deleteRequestData, loading: deleteLoading },
    ] = useMutationWithError(useDeleteRequestMutation, {});
    const deleteRequest = useCallback(
        (requestId: string) => {
            deleteRequestMutation({
                variables: {
                    requestId,
                },
            });
        },
        [deleteRequestMutation]
    );
    useEffect(() => {
        if (deleteRequestData?.deleteRequestById) {
            toast({
                title: "Request Deleted",
                description: "Your request was successfully deleted",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            setRequests((prev) =>
                prev.remove(deleteRequestData.deleteRequestById)
            );
        }
    }, [deleteRequestData?.deleteRequestById, toast, requests, setRequests]);
    return (
        <>
            <Loadable isLoading={loading}>
                {requestList.length > 0 ? (
                    <RequestTable
                        requestList={requestList}
                        openOfferModal={openOfferModal}
                        openViewRequestModal={openRequestView}
                        deleteLoading={deleteLoading}
                        deleteRequest={deleteRequest}
                    />
                ) : (
                    <Center mt={2}>
                        <Text>No requests available</Text>
                    </Center>
                )}
            </Loadable>
            <OfferRequestModalContainer
                requestId={selectedRequest}
                isOpen={isOpenOffer}
                onClose={onCloseOffer}
            />
            <ViewMyRequestModalContainer
                requestId={selectedRequest}
                isOpen={isOpenRequestView}
                onClose={onCloseRequestView}
            />
        </>
    );
};
