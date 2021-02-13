import React, { useContext } from "react";
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
import { UserContext } from "../../utils/user";

type Props = {
    requestList: Array<RequestResponse>;
    openModal: (requestId: number) => void;
};

export const RequestTable: React.FC<Props> = ({ requestList, openModal }) => {
    const tableBorder = useColorModeValue("gray.400", "gray.600");
    const { user } = useContext(UserContext);
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
                    </Tr>
                </Thead>

                <Tbody>
                    {requestList.map((requestItem, index) => (
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
                                {requestItem.requester.username !==
                                    user.username && (
                                    <Button
                                        colorScheme="teal"
                                        onClick={() => {
                                            openModal(requestItem.id);
                                        }}
                                    >
                                        Make an Offer
                                    </Button>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
