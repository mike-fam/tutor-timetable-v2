import {
    Box,
    Button,
    Heading,
    Tab,
    TabList,
    Tabs,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { EditRequestModalContainer } from "../../containers/requests/EditRequestModalContainer";
import { TabViewType } from "../../containers/requests/RequestListContainer";
import { OfferRequestModalContainer } from "../../containers/requests/OfferRequestModalContainer";

type Props = {
    // TODO: Replace when data is figured out.
    requestList: Array<number>;
    setTabListView: (value: TabViewType) => void;
};

export const RequestList: React.FunctionComponent<Props> = (props: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Tabs isFitted onChange={(e) => props.setTabListView(e)}>
                <TabList>
                    <Tab value={TabViewType.ALL}>All Requests</Tab>
                    <Tab value={TabViewType.PERSONAL}>Your Requests</Tab>
                </TabList>
                {props.requestList.map((item, index) => (
                    <Box key={index}>
                        <Heading size="md">Request Title</Heading>
                        <p>Requestor name, status, session</p>
                        <Button
                            onClick={() => {
                                onOpen();
                            }}
                        >
                            Make an offer
                        </Button>
                    </Box>
                ))}
            </Tabs>
            <EditRequestModalContainer />
            <OfferRequestModalContainer
                requestId={51}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};
