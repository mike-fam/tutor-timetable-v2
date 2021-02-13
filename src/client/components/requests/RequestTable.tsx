import React from "react";
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { RequestResponse } from "../../types/requests";

type Props = {
    requestList: Array<RequestResponse>;
};

export const RequestTable: React.FC<Props> = ({ requestList }) => {
    return (
        <Box
            w="100%"
            h="100%"
            style={{
                height: "700px",
                border: "1px solid black",
            }}
            overflow="scroll"
        >
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Course</Th>
                        <Th>Opened By</Th>
                        <Th>Status</Th>
                        <Th>Session</Th>
                        <Th>Preferences</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {requestList.map((requestItem, index) => (
                        // TODO: Styling
                        <Tr key={index}>
                            <Td maxWidth={"200"}>{requestItem.title}</Td>
                            <Td>
                                {
                                    requestItem.session.sessionStream.timetable
                                        .course.code
                                }
                            </Td>
                            <Td>{requestItem.requester.username}</Td>
                            <Td>{requestItem.status}</Td>
                            <Td>
                                {`${requestItem.session.sessionStream.name} (Week ${requestItem.session.week})`}
                            </Td>
                            <Td>
                                {requestItem.swapPreference.length === 0 && (
                                    <Text>No preferences we provided</Text>
                                )}
                                {requestItem.swapPreference.map(
                                    (session, i) => (
                                        <Text
                                            key={i}
                                            style={{
                                                display: "inline",
                                            }}
                                        >
                                            {`${session.sessionStream.name} (Week ${session.week})`}
                                            {i + 1 !==
                                                requestItem.swapPreference
                                                    .length && ", "}
                                        </Text>
                                    )
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
