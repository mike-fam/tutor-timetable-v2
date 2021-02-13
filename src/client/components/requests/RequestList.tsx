import {
    Center,
    Tab,
    TabList,
    Tabs,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { TabViewType } from "../../containers/requests/RequestListContainer";
import { OfferRequestModalContainer } from "../../containers/requests/OfferRequestModalContainer";
import { RequestResponse } from "../../types/requests";
import { Loadable } from "../helpers/Loadable";
import { RequestTable } from "./RequestTable";

type Props = {
    requestList: Array<RequestResponse>;
    loading: boolean;
    setTabListView: (value: TabViewType) => void;
};

export const RequestList: React.FunctionComponent<Props> = ({
    requestList,
    loading,
    setTabListView,
}) => {
    const { isOpen, onClose } = useDisclosure();
    return (
        <>
            <Tabs isFitted onChange={(e) => setTabListView(e)}>
                <TabList>
                    <Tab value={TabViewType.ALL}>All Requests</Tab>
                    <Tab value={TabViewType.PERSONAL}>Your Requests</Tab>
                </TabList>
                <Loadable isLoading={loading}>
                    {requestList.length > 0 ? (
                        <RequestTable requestList={requestList} />
                    ) : (
                        <Center mt={2}>
                            <Text>No requests available</Text>
                        </Center>
                    )}
                </Loadable>
            </Tabs>
            <OfferRequestModalContainer
                requestId={51}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};
