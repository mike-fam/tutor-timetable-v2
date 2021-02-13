import { Center, Text, useDisclosure } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { OfferRequestModalContainer } from "../../containers/requests/OfferRequestModalContainer";
import { RequestResponse } from "../../types/requests";
import { Loadable } from "../helpers/Loadable";
import { RequestTable } from "./RequestTable";
import { notSet } from "../../constants";

type Props = {
    requestList: Array<RequestResponse>;
    loading: boolean;
};

export const RequestList: React.FunctionComponent<Props> = ({
    requestList,
    loading,
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [selectedRequest, setSelectedRequest] = useState(notSet);
    const openModal = useCallback(
        (requestId: number) => {
            setSelectedRequest(requestId);
            onOpen();
        },
        [setSelectedRequest, onOpen]
    );
    return (
        <>
            <Loadable isLoading={loading}>
                {requestList.length > 0 ? (
                    <RequestTable
                        requestList={requestList}
                        openModal={openModal}
                    />
                ) : (
                    <Center mt={2}>
                        <Text>No requests available</Text>
                    </Center>
                )}
            </Loadable>
            <OfferRequestModalContainer
                requestId={selectedRequest}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};
