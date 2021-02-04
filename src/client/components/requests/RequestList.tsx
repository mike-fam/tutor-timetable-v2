import {
    Center,
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
import { RequestResponse } from "../../types/requests";
import { Loadable } from "../helpers/Loadable";

type Props = {
    requestList: Array<RequestResponse>;
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
                    {props.requestList.length > 0 ? (
                        <Table size="lg">
                            <Thead>
                                <Tr>
                                    <Th>Request Title</Th>
                                    <Th>Course</Th>
                                    <Th>Opened By</Th>
                                    <Th>Status</Th>
                                    <Th>Session</Th>
                                    <Th>Preferences</Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {props.requestList.map((requestItem, index) => (
                                    // TODO: Styling
                                    <Tr
                                        key={index}
                                        _hover={{
                                            cursor: "pointer",
                                            background: "grey",
                                        }}
                                    >
                                        <Td>{requestItem.title}</Td>
                                        <Td>
                                            {
                                                requestItem.session
                                                    .sessionStream.timetable
                                                    .course.code
                                            }
                                        </Td>
                                        <Td>
                                            {requestItem.requester.username}
                                        </Td>
                                        <Td>{requestItem.status}</Td>
                                        <Td>
                                            {requestItem.session.sessionStream
                                                .name +
                                                " (Week " +
                                                requestItem.session.week +
                                                ")"}
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
                                                        {session.sessionStream
                                                            .name +
                                                            " (Week " +
                                                            session.week +
                                                            ")"}
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
                                ))}
                            </Tbody>
                        </Table>
                    ) : (
                        <Center mt={2}>
                            <Text>No requests available</Text>
                        </Center>
                    )}
                </Loadable>
            </Tabs>
            {/* <EditRequestModalContainer /> */}
        </>
    );
};
