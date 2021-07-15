import React, { FC, useState } from "react";
import { CourseQuery, SessionType, TermQuery } from "../../generated/graphql";
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
    ModalOverlay, Stack,
} from "@chakra-ui/react";
import { Set } from "immutable";
import { sentenceCase } from "change-case";
import { SimpleCheckboxList } from "../../components/helpers/SimpleCheckboxList";

type Props = {
    fetchFromTimetable: (sessionTypes: SessionType[]) => any;
    isOpen: boolean;
    onClose: () => void;
    course?: CourseQuery["course"];
    term?: TermQuery["term"];
};

export const FetchFromTimetableModal: FC<Props> = ({
    fetchFromTimetable,
    course,
    term,
    isOpen,
    onClose,
}) => {
    const [selectedSessionTypes, selectSessionTypes] = useState<
        Set<SessionType>
    >(Set<SessionType>());
    console.log(course, term);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>Term</FormLabel>
                            <Input
                                value={
                                    term &&
                                    `${sentenceCase(term.type)}, ${term.year}`
                                }
                                readOnly={true}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Course</FormLabel>
                            <Input
                                value={course?.code}
                                readOnly={true}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>SessionTypes</FormLabel>
                            <SimpleCheckboxList
                                elements={[
                                    SessionType.Lecture,
                                    SessionType.Practical,
                                    SessionType.Tutorial,
                                    SessionType.Contact,
                                    SessionType.Seminar,
                                    SessionType.Studio,
                                    SessionType.Workshop,
                                ]}
                                selectFunc={(value, selected) => {
                                    if (selected) {
                                        selectSessionTypes((prev) =>
                                            prev.add(value)
                                        );
                                    } else {
                                        selectSessionTypes((prev) =>
                                            prev.remove(value)
                                        );
                                    }
                                }}
                                textDisplayed={(elem) => sentenceCase(elem)}
                            />
                        </FormControl>

                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="green"
                        mr={3}
                        onClick={() => {
                            fetchFromTimetable(
                                selectedSessionTypes.valueSeq().toArray()
                            );
                            onClose();
                        }}
                    >
                        Fetch
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
