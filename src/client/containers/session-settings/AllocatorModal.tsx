import React, { useEffect, useState } from "react";
import { UserMap } from "../../hooks/useUsersOfCourse";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { MultiSelect } from "../../components/helpers/MultiSelect";
import { Role } from "../../generated/graphql";

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
                            size={"md"}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="green" mr={3} onClick={close}>
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
