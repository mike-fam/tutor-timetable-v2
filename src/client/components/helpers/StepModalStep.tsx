import {
    Box,
    Divider,
    ModalBody,
    ModalBodyProps,
    ModalCloseButton,
    ModalHeader,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { StepModalContext } from "./StepModal";

type Props = ModalBodyProps & {
    step: number;
    header: string;
};

export const StepModalStep: React.FC<Props> = ({
    step,
    header,
    children,
    ...props
}) => {
    const { currentStep } = useContext(StepModalContext);
    return (
        <Box d={currentStep === step ? "block" : "none"}>
            <ModalHeader>{header}</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody {...props}>{children}</ModalBody>
        </Box>
    );
};
