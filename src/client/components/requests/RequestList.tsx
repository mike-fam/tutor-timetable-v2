import { Center, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { OfferRequestModalContainer } from "../../containers/requests/OfferRequestModalContainer";
import { RequestResponse } from "../../types/requests";
import { Loadable } from "../helpers/Loadable";
import { RequestTable } from "./RequestTable";

type Props = {
    requestList: Array<RequestResponse>;
    loading: boolean;
};

export const RequestList: React.FunctionComponent<Props> = ({
    requestList,
    loading,
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Loadable isLoading={loading}>
                {requestList.length > 0 ? (
                    <RequestTable
                        requestList={requestList}
                        openModal={onOpen}
                    />
                ) : (
                    <Center mt={2}>
                        <Text>No requests available</Text>
                    </Center>
                )}
            </Loadable>
            <OfferRequestModalContainer
                requestId={51}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};
