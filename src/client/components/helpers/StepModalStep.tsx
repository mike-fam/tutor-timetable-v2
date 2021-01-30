import {
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
    if (currentStep !== step) {
        return null;
    }
    return (
        <>
            <ModalHeader>{header}</ModalHeader>
            <ModalCloseButton />
            <ModalBody {...props}>{children}</ModalBody>
        </>
    );
};
