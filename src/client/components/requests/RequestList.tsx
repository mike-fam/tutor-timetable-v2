import { Box, Heading, Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

type Props = {
    // placeholder
    requestList: Array<number>;
    setTabListView: Function;
};

export const RequestList: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <Tabs isFitted>
                <TabList>
                    <Tab>All Requests</Tab>
                    <Tab>Your Requests</Tab>
                </TabList>
                {props.requestList.map((item, index) => (
                    <Box key={index}>
                        <Heading size="md">Request Title</Heading>
                        <p>Requestor name, status, session</p>
                    </Box>
                ))}
            </Tabs>
        </>
            <EditRequestModalContainer />
    );
};
