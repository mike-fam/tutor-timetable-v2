import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type Props = {
    isOpen: boolean;
    toggle: Function;
    // Proper types will come later.
    type: string;
    userType: string;
};

export const RequestModal: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={() => props.toggle(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {props.type === "open" ? (
                        <p>Request title here</p>
                    ) : (
                        <p>Create a new Request</p>
                    )}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>test</ModalBody>

                <ModalFooter>
                    {props.userType === "student" ? (
                        <Button>apply</Button>
                    ) : (
                        <>
                            <Button>Approve</Button>
                            <Button>Revoke</Button>
                        </>
                    )}
                    <Button onClick={() => props.toggle(false)}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
