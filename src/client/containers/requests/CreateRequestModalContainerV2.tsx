import React from "react";
import { Button, Center, useDisclosure } from "@chakra-ui/react";
import { RequestModal } from "../../components/requests/RequestModal";
import { useRequestFormState } from "../../hooks/useRequestFormState";
import { RequestForm } from "../../components/requests/RequestForm";

type Props = {};

export const CreateRequestModalContainerV2: React.FC<Props> = ({}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const formState = useRequestFormState();
    const courseList = ["CSSE1001", "CSSE2002", "CSSE3002"];
    const sessionList = ["T01", "T02", "P01", "P02"];
    const semester = "Semester 1, 2021";

    return (
        <>
            <Center>
                <Button onClick={onOpen}>New Request</Button>
            </Center>
            <RequestModal
                renderHeader={() => <p>Create A New Request - {semester}</p>}
                renderBody={() => (
                    <RequestForm
                        {...formState}
                        courseList={courseList}
                        sessionList={sessionList}
                    />
                )}
                renderFooterButton={() => <Button>Submit</Button>}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};