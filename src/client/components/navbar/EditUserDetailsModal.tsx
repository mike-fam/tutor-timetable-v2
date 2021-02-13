import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { UserState } from "../../types/user";

type Props = {
    user: UserState;
    isOpen: boolean;
    closeModal: () => void;
    modalBody: () => ReactElement;
};

export const EditUserDetailsModal: React.FC<Props> = (props: Props) => {
    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Personal Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{props.modalBody()}</ModalBody>

                    <ModalFooter>
                        <Button onClick={props.closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
