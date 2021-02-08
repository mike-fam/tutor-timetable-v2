import { Box, Heading, Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";
import { EditRequestModalContainer } from "../../containers/requests/EditRequestModalContainer";
import { TabViewType } from "../../containers/requests/RequestListContainer";

type Props = {
    // TODO: Replace when data is figured out.
    requestList: Array<number>;
    setTabListView: (value: TabViewType) => void;
};

export const RequestList: React.FunctionComponent<Props> = (props: Props) => {
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
                    </Box>
                ))}
            </Tabs>
            <EditRequestModalContainer />
        </>
    );
};
