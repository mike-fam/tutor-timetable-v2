import {
    Tab,
    Table,
    TabList,
    Tabs,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React from "react";
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
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Request Title</Th>
                                <Th>Opened By</Th>
                                <Th>Status</Th>
                                <Th>Session</Th>
                                <Th>Preferences</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {props.requestList?.getRequestsByCourseIds.map(
                                (requestItem, index) => (
                                    <Tr
                                        key={index}
                                        _hover={{
                                            cursor: "pointer",
                                            background: "grey",
                                        }}
                                    >
                                        <Td>{requestItem.title}</Td>
                                        <Td>
                                            {requestItem.requester.username}
                                        </Td>
                                        <Td>{requestItem.status}</Td>
                                        <Td>
                                            {
                                                requestItem.session
                                                    .sessionStream.name
                                            }
                                        </Td>
                                        <Td>
                                            {requestItem.swapPreference.map(
                                                (session, i) => (
                                                    <Text
                                                        key={i}
                                                        style={{
                                                            display: "inline",
                                                        }}
                                                    >
                                                        {
                                                            session
                                                                .sessionStream
                                                                .name
                                                        }
                                                        {i + 1 ===
                                                        requestItem
                                                            .swapPreference
                                                            .length
                                                            ? ""
                                                            : ", "}
                                                    </Text>
                                                )
                                            )}
                                        </Td>
                                    </Tr>
                                )
                            )}
                        </Tbody>
                    </Table>
                </Loadable>
            </Tabs>
            {/* <EditRequestModalContainer /> */}
        </>
    );
};
