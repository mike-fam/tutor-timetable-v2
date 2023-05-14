import {
    Box,
    Divider,
    ModalBody,
    ModalBodyProps,
    ModalCloseButton,
    ModalHeader,
} from "@chakra-ui/react";
import { FC, useContext } from "react";
import { StepModalContext } from "./StepModal";

type Props = ModalBodyProps & {
    step: number;
    header: string;
};

export const StepModalStep: FC<Props> = ({
    step,
    header,
    children,
    ...props
}) => {
    const { currentStep } = useContext(StepModalContext);
    return (
        <Box display={currentStep === step ? "block" : "none"}>
            <ModalHeader>{header}</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody {...props}>{children}</ModalBody>
        </Box>
    );
};
