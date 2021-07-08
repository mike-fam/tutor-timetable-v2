import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";

type Props = {
    isOpen: boolean;
    isLoading: boolean;
    close: () => void;
    apply: () => Promise<any>;
};

export const AllocatorConfirmDialog: React.FC<Props> = ({
    isOpen,
    close,
    apply,
    isLoading,
}) => {
    const cancelRef = useRef<HTMLButtonElement>(null);
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => {
                close();
            }}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Apply Allocation
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you want to apply this allocation?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button
                            ref={cancelRef}
                            onClick={() => {
                                close();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={async () => {
                                await apply();
                                close();
                            }}
                            ml={3}
                            isLoading={isLoading}
                        >
                            Apply
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
