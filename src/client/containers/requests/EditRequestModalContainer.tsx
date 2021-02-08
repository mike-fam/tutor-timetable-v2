import React from "react";
import { Button, Center, useDisclosure } from "@chakra-ui/react";
import { RequestModal } from "../../components/requests/RequestModal";
import { useRequestFormState } from "../../hooks/useRequestFormState";
import { RequestForm } from "../../components/requests/RequestForm";
import { RequestType } from "../../generated/graphql";

type Props = {};

export const EditRequestModalContainer: React.FC<Props> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const formState = useRequestFormState({
        course: 0,
        title: "Test title",
        duration: RequestType.Temporary,
        description: "Test Desc",
    });

    //TODO: Placeholders, replace with actual values.
    const courseList = [0, 1, 2, 3];
    const sessionList = [0, 1, 2, 3];
    const semester = "Semester 1, 2021";

    return (
        <>
            <Center>
                <Button onClick={onOpen}>Edit Request</Button>
            </Center>
            <RequestModal
                renderHeader={() => (
                    <p>Edit An Existing Request - {semester}</p>
                )}
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
