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
import { Role } from "../../../types/user";

export enum RequestModalType {
    View = "View",
    Create = "Create",
}

type Props = {
    isOpen: boolean;
    toggle: Function;
    // Proper types will come later.
    type: RequestModalType;
    userType: Role;
};

export const RequestModal: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={() => props.toggle(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {props.type === RequestModalType.View ? (
                        <p>Request title here</p>
                    ) : (
                        <p>Create a new Request</p>
                    )}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {props.type === RequestModalType.View ? (
                        <div>open request body</div>
                    ) : (
                        <div>create new request body</div>
                    )}
                </ModalBody>

                <ModalFooter>
                    {props.userType === Role.CourseCoordinator &&
                    props.type === RequestModalType.View ? (
                        <>
                            <Button>Approve</Button>
                            <Button>Revoke</Button>
                        </>
                    ) : null}
                    {props.userType === Role.Staff &&
                    props.type === RequestModalType.View ? (
                        <>
                            <Button>Apply</Button>
                        </>
                    ) : null}
                    <Button onClick={() => props.toggle(false)}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
