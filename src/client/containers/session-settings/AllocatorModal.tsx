import React, { useEffect, useState } from "react";
import { UserMap } from "../../hooks/useUsersOfCourse";
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from "@chakra-ui/react";
import { MultiSelect } from "../../components/helpers/MultiSelect";
import { Role } from "../../generated/graphql";
import { SimpleNumberInput } from "../../components/helpers/SimpleNumberInput";

type Props = {
    isOpen: boolean;
    close: () => void;
    users: UserMap;
    onSubmit: (users: string[], timeout: number) => void;
    courseCode: string;
    termName: string;
};

export const AllocatorModal: React.FC<Props> = ({
    isOpen,
    close,
    onSubmit,
    users,
    courseCode,
    termName,
}) => {
    const [selectedElems, setSelectedElems] = useState<string[]>([]);
    const [timeout, setTimeout] = useState(3600);
    useEffect(() => {
        users.forEach((user, id) => {
            if (user.role === Role.CourseCoordinator) {
                return;
            }
            setSelectedElems((prev) => [...prev, id]);
        });
    }, [users]);
    return (
        <Modal isOpen={isOpen} onClose={close} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Generate Allocation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={3}>
                        {/*TODO: Use Formik here */}
                        <FormControl>
                            <FormLabel>Term</FormLabel>
                            <Input value={termName} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Course</FormLabel>
                            <Input value={courseCode} isReadOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Staff Included</FormLabel>
                            <MultiSelect
                                elements={users
                                    .entrySeq()
                                    .map(
                                        ([id, user]) =>
                                            [id, user.name] as [string, string]
                                    )
                                    .toArray()}
                                selectedElements={selectedElems}
                                setSelectedElements={setSelectedElems}
                                size="md"
                                sorted
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Timeout (seconds)</FormLabel>
                            <SimpleNumberInput
                                value={timeout}
                                onChange={(value) => {
                                    setTimeout(value);
                                }}
                                max={14400}
                            />
                            <FormHelperText>
                                Allocation process will stop after exceeding
                                timeout. A longer timeout value will yield
                                better results. The allocation process can also
                                stop early if it finds the best result is found
                                before the timeout is reached.
                            </FormHelperText>
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="green"
                        mr={3}
                        onClick={() => {
                            onSubmit(selectedElems, timeout);
                            close();
                        }}
                    >
                        Generate
                    </Button>
                    <Button variant="ghost" onClick={close}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
