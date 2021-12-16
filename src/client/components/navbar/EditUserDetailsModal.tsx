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
import { FC, ReactElement } from "react";

type Props = {
    isOpen: boolean;
    closeModal: () => void;
    modalBody: () => ReactElement;
    submitButton: () => ReactElement;
};

export const EditUserDetailsModal: FC<Props> = (props: Props) => {
    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Personal Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{props.modalBody()}</ModalBody>

                    <ModalFooter>
                        <Button onClick={props.closeModal} variant="ghost">
                            Cancel
                        </Button>
                        {props.submitButton()}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
