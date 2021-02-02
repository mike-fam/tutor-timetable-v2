import {
    Box,
    Center,
    Divider,
    Tab,
    TabList,
    Tabs,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { EditRequestModalContainer } from "../../containers/requests/EditRequestModalContainer";
import { TabViewType } from "../../containers/requests/RequestListContainer";
import { GetRequestsByCourseIdsQuery } from "../../generated/graphql";
import { Loadable } from "../helpers/Loadable";

type Props = {
    requestList: GetRequestsByCourseIdsQuery | undefined;
    loading: boolean;
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
                <Loadable isLoading={props.loading}>
                    <Box
                        mt={1}
                        _hover={{
                            cursor: "pointer",
                            border: "1px solid black",
                        }}
                        border="1px"
                        borderColor="transparent"
                    >
                        {props.requestList?.getRequestsByCourseIds.map(
                            (item, index) => (
                                <Box m={4} key={index}>
                                    <Text fontSize="2xl">{item.title}</Text>
                                    <Text fontSize="sm">
                                        Opened By: {item.requester.username} |
                                        Status: {item.status}
                                    </Text>
                                    <Text fontSize="sm">
                                        From {item.session.sessionStream.name}{" "}
                                        to{" "}
                                        {item.swapPreference.map(
                                            (session, i) => (
                                                <Text
                                                    key={i}
                                                    style={{
                                                        display: "inline-block",
                                                    }}
                                                >
                                                    {session.sessionStream.name}
                                                    &nbsp;
                                                </Text>
                                            )
                                        )}
                                    </Text>
                                </Box>
                            )
                        )}
                        {props.requestList?.getRequestsByCourseIds.length ===
                            0 && <Center>No requests available</Center>}
                        <Divider></Divider>
                    </Box>
                </Loadable>
            </Tabs>
            <EditRequestModalContainer />
        </>
    );
};
