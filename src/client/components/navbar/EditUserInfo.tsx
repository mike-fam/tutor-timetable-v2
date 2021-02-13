import {
    Button,
    Divider,
    FormControl,
    FormLabel,
    Input,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { EditUserInfoFormContainer } from "../../containers/navbar/EditUserInfoFormContainer";
import { UserState } from "../../types/user";
import { InputWithError } from "../helpers/InputWithError";

type Props = {
    user: UserState;
    openModal: () => void;
    closeModal: () => void;
    isOpen: boolean;
};

export const EditUserInfo: React.FC<Props> = (props: Props) => {
    return (
        <>
            <MenuItem onClick={() => props.openModal()}>
                Edit Personal Info
            </MenuItem>
            <Modal isOpen={props.isOpen} onClose={props.closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Personal Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EditUserInfoFormContainer />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={props.closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
