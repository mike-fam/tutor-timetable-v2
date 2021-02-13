import React from "react";
import {
    Box,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { RequestResponse } from "../../types/requests";

type Props = {
    requestList: Array<RequestResponse>;
    openModal: (requestId: number) => void;
};

export const RequestTable: React.FC<Props> = ({ requestList, openModal }) => {
    const tableBorder = useColorModeValue("gray.400", "gray.600");
    return (
        <Box borderRadius={5} border="1px" borderColor={tableBorder}>
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
                                {/*{requestItem.swapPreference.length === 0 && (*/}
                                {/*    <Text>No preferences we provided</Text>*/}
                                {/*)}*/}
                                {/*{requestItem.swapPreference.map(*/}
                                {/*    (session, i) => (*/}
                                {/*        <Text*/}
                                {/*            key={i}*/}
                                {/*            style={{*/}
                                {/*                display: "inline",*/}
                                {/*            }}*/}
                                {/*        >*/}
                                {/*            {`${session.sessionStream.name} (Week ${session.week})`}*/}
                                {/*            {i + 1 !==*/}
                                {/*                requestItem.swapPreference*/}
                                {/*                    .length && ", "}*/}
                                {/*        </Text>*/}
                                {/*    )*/}
                                {/*)}*/}
                                <Button
                                    onClick={() => {
                                        openModal(requestItem.id);
                                    }}
                                >
                                    Make an Offer
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
