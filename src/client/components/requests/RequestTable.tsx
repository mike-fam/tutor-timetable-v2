import React, { useContext, useRef, useState } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { RequestResponse } from "../../types/requests";
import { UserContext } from "../../utils/user";
import { RequestStatus } from "../../generated/graphql";
import { notSet } from "../../constants";

type Props = {
    requestList: Array<RequestResponse>;
    openOfferModal: (requestId: number) => void;
    openViewRequestModal: (requestId: number) => void;
    deleteRequest: (requestId: number) => void;
    deleteLoading: boolean;
};

export const RequestTable: React.FC<Props> = ({
    requestList,
    openOfferModal,
    openViewRequestModal,
    deleteLoading,
    deleteRequest,
}) => {
    const [requestId, setRequestId] = useState(notSet);
    const tableBorder = useColorModeValue("gray.400", "gray.600");
    const { user } = useContext(UserContext);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const { isOpen, onClose, onOpen } = useDisclosure();
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
                                    user.username &&
                                    requestItem.status ===
                                        RequestStatus.Open && (
                                        <Button
                                            colorScheme="teal"
                                            onClick={() => {
                                                openOfferModal(requestItem.id);
                                            }}
                                        >
                                            Make an Offer
                                        </Button>
                                    )}
                                {requestItem.requester.username ===
                                    user.username && (
                                    <>
                                        <Button
                                            colorScheme="pink"
                                            onClick={() => {
                                                openViewRequestModal(
                                                    requestItem.id
                                                );
                                            }}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            colorScheme="red"
                                            onClick={() => {
                                                setRequestId(requestItem.id);
                                                onOpen();
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Request
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this request?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    deleteRequest(requestId);
                                    onClose();
                                }}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};
