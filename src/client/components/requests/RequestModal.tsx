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
import React, { ReactElement } from "react";

export enum RequestModalType {
    View = "View",
    Create = "Create",
}

type Props = {
    // isOpen: boolean;
    // toggle: (toggle: boolean) => void;
    // type: RequestModalType;
    // userType: Role;
    renderHeader: () => ReactElement;
    renderBody: () => ReactElement;
    renderFooterButton: () => ReactElement;
    isOpen: boolean;
    onClose: () => void;
};

export const RequestModal: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Modal size={"xl"} isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{props.renderHeader()}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>{props.renderBody()}</ModalBody>

                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={props.onClose}>Cancel</Button>
                        {props.renderFooterButton()}
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
