import React from "react";
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

type Props = {
    isOpen: boolean;
    close: () => void;
};

export const TimeslotModal: React.FC<Props> = ({ isOpen, close }) => {
    return (
        <Modal isOpen={isOpen} onClose={close}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Test</ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => {
                            close();
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            close();
                        }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
