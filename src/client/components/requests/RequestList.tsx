import { Center, Text, useDisclosure } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { OfferRequestModalContainer } from "../../containers/requests/OfferRequestModalContainer";
import { RequestResponse } from "../../types/requests";
import { Loadable } from "../helpers/Loadable";
import { RequestTable } from "./RequestTable";
import { notSet } from "../../constants";
import { ViewMyRequestModalContainer } from "../../containers/requests/ViewMyRequestModalContainer";

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
    const [selectedRequest, setSelectedRequest] = useState(notSet);
    const openOfferModal = useCallback(
        (requestId: number) => {
            setSelectedRequest(requestId);
            onOpenOffer();
        },
        [setSelectedRequest, onOpenOffer]
    );
    const openRequestView = useCallback(
        (requestId: number) => {
            setSelectedRequest(requestId);
            onOpenRequestView();
        },
        [setSelectedRequest, onOpenRequestView]
    );
    return (
        <>
            <Loadable isLoading={loading}>
                {requestList.length > 0 ? (
                    <RequestTable
                        requestList={requestList}
                        openOfferModal={openOfferModal}
                        openViewRequestModal={openRequestView}
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
