import {
    Button,
    ButtonGroup,
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
import { CreateRequestForm } from "./CreateRequestForm";

export enum RequestModalType {
    View = "View",
    Create = "Create",
}

type Props = {
    isOpen: boolean;
    toggle: (toggle: boolean) => void;
    type: RequestModalType;
    userType: Role;
};

export const RequestModal: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Modal
            size={"xl"}
            isOpen={props.isOpen}
            onClose={() => props.toggle(false)}
        >
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
                        <CreateRequestForm />
                    )}
                </ModalBody>

                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={() => props.toggle(false)}>
                            Cancel
                        </Button>
                        {props.userType === Role.COURSE_COORDINATOR &&
                        props.type === RequestModalType.View ? (
                            <>
                                <Button>Approve</Button>
                                <Button>Revoke</Button>
                            </>
                        ) : null}
                        {props.userType === Role.STAFF &&
                        props.type === RequestModalType.View ? (
                            <>
                                <Button>Apply</Button>
                            </>
                        ) : null}
                        {props.type === RequestModalType.Create && (
                            <Button onClick={() => props.toggle(false)}>
                                Create
                            </Button>
                        )}
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
