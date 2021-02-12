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
import { UserState } from "../../types/user";
import { InputWithError } from "../helpers/InputWithError";

type Props = {
    user: UserState;
    openModal: () => void;
    closeModal: () => void;
    isOpen: boolean;
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
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
                        <FormControl>
                            <FormLabel>Change Your Name:</FormLabel>
                            <Input
                                placeholder={props.user.name}
                                value={props.name}
                                onChange={(e) => props.setName(e.target.value)}
                            />
                            <Button mt={3}>Submit name</Button>
                            <Divider mt={3} mb={3}></Divider>
                            <FormLabel>Change Your Email:</FormLabel>
                            <Input placeholder={props.user.email} />
                            <Button mt={3}>Submit email</Button>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={props.closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
