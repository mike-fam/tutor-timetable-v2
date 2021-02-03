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
import { CourseStaffForm } from "./CourseStaffForm";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const AddCourseStaffModal: React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Course Staff</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CourseStaffForm onSubmit={() => {}} />
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
