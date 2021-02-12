import {
    Box,
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
        <Tabs isFitted onChange={(e) => props.setTabListView(e)}>
            <TabList>
                <Tab value={TabViewType.ALL}>All Requests</Tab>
                <Tab value={TabViewType.PERSONAL}>Your Requests</Tab>
            </TabList>
            <Loadable isLoading={props.loading}>
                {props.requestList.length > 0 ? (
                    <Box
                        w="100%"
                        h="100%"
                        style={{
                            height: "700px",
                            border: "1px solid black",
                        }}
                        overflow={"scroll"}
                    >
                        <Table size="lg">
                            <Thead>
                                <Tr>
                                    <Th minWidth={"200px"}>
                                        <Center>Title</Center>
                                    </Th>
                                    <Th>
                                        <Center>Course</Center>
                                    </Th>
                                    <Th>
                                        <Center minWidth={"150px"}>
                                            Opened By
                                        </Center>
                                    </Th>
                                    <Th>
                                        <Center>Status</Center>
                                    </Th>
                                    <Th minWidth={"200px"}>
                                        <Center>Session</Center>
                                    </Th>
                                    <Th>
                                        <Center>Preferences</Center>
                                    </Th>
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
                                        <Td maxWidth={"200"}>
                                            <Center>
                                                <Text isTruncated>
                                                    {requestItem.title}
                                                </Text>
                                            </Center>
                                        </Td>
                                        <Td>
                                            <Center>
                                                {
                                                    requestItem.session
                                                        .sessionStream.timetable
                                                        .course.code
                                                }
                                            </Center>
                                        </Td>
                                        <Td>
                                            <Center>
                                                {requestItem.requester.username}
                                            </Center>
                                        </Td>
                                        <Td>
                                            <Center>
                                                {requestItem.status}
                                            </Center>
                                        </Td>
                                        <Td>
                                            <Center>
                                                {
                                                    requestItem.session
                                                        .sessionStream.name
                                                }
                                            </Center>
                                            <Center>
                                                {" (Week " +
                                                    requestItem.session.week +
                                                    ")"}
                                            </Center>
                                        </Td>
                                        <Td>
                                            {requestItem.swapPreference
                                                .length === 0 && (
                                                <Text>
                                                    No preferences we provided
                                                </Text>
                                            )}
                                            <Center isTruncated noOfLines={2}>
                                                {requestItem.swapPreference.map(
                                                    (session, i) => (
                                                        <Text
                                                            key={i}
                                                            style={{
                                                                display:
                                                                    "inline",
                                                            }}
                                                        >
                                                            {session
                                                                .sessionStream
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
                                            </Center>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                ) : (
                    <Center mt={2}>
                        <Text>No requests available</Text>
                    </Center>
                )}
            </Loadable>
        </Tabs>
    );
};
