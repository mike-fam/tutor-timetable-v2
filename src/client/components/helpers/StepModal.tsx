import { createContext, FC, useCallback, useMemo, useState } from "react";
import {
    Button,
    HStack,
    Modal,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    ModalProps,
} from "@chakra-ui/react";

type StepModalState = {
    stepCount: number;
    currentStep: number;
};

type Props = Omit<ModalProps, "isOpen" | "onClose"> & {
    onSubmit: () => void;
    stepCount: number;
    isOpen: boolean;
    onClose: () => void;
    validateStep: (currentStep: number) => boolean;
    isSubmitting: boolean;
};

export const StepModalContext = createContext<StepModalState>({
    stepCount: 0,
    currentStep: 0,
});

export const StepModal: FC<Props> = ({
    onSubmit,
    stepCount,
    validateStep,
    onClose,
    isSubmitting,
    children,
    ...props
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const isLastStep = useMemo(
        () => currentStep >= stepCount - 1,
        [currentStep, stepCount]
    );
    const close = useCallback(() => {
        setCurrentStep(0);
        onClose();
    }, [onClose]);
    return (
        <Modal {...props} onClose={close}>
            <StepModalContext.Provider
                value={{
                    stepCount,
                    currentStep,
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    {children}
                    <ModalFooter>
                        <HStack justify="flex-end" spacing={3}>
                            <Button onClick={() => close()}>Cancel</Button>
                            <Button
                                isDisabled={currentStep === 0}
                                colorScheme="blue"
                                variant="outline"
                                onClick={() =>
                                    setCurrentStep((prev) => prev - 1)
                                }
                            >
                                Prev
                            </Button>
                            <Button
                                colorScheme="blue"
                                isDisabled={!validateStep(currentStep)}
                                onClick={
                                    isLastStep
                                        ? async () => {
                                              await onSubmit();
                                              close();
                                          }
                                        : () => {
                                              setCurrentStep(
                                                  (prev) => prev + 1
                                              );
                                          }
                                }
                            >
                                {isLastStep ? "Submit" : "Next"}
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </StepModalContext.Provider>
        </Modal>
    );
};
