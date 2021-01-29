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
import { Role } from "../../../server/types/user";
import { CreateRequestFormContainer } from "../../containers/requests/CreateRequestFormContainer";

export enum RequestModalType {
    View = "View",
    Create = "Create",
}

type Props = {
    renderHeader: () => ReactElement;
    renderBody: () => ReactElement;
    renderFooterButton: () => ReactElement;
    isOpen: boolean;
    onClose: () => void;
};

export const RequestModal: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Modal size={"6xl"} isOpen={props.isOpen} onClose={props.onClose}>
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
