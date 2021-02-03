import React, { useEffect, useState } from "react";
import {
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { useTermsQuery } from "../../generated/graphql";
import { getCurrentTerm } from "../../utils/term";
import { useTermCourse } from "../../hooks/useTermCourse";
import { TermResponseType } from "../../types/term";
import { Wrapper } from "../../components/helpers/Wrapper";
import { capitalCase } from "change-case";
import { CourseStaffTableContainer } from "./CourseStaffTableContainer";
import { AddIcon } from "@chakra-ui/icons";
import { AddCourseStaffModal } from "./AddCourseStaffModal";

type Props = {};

export const CourseStaffPageContainer: React.FC<Props> = ({}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const { termId, courseId, changeCourse, changeTerm } = useTermCourse();
    const [term, setTerm] = useState<TermResponseType>();
    useEffect(() => {
        if (!termsData) {
            return;
        }
        const currentTerm = getCurrentTerm(termsData.terms);
        changeTerm(currentTerm.id);
        setTerm(currentTerm);
    }, [termsData, changeTerm]);
    return (
        <Wrapper>
            <Heading>Course Staff</Heading>
            <Stack mt={4} spacing={4} direction="column">
                <Text fontWeight="bold">
                    Term: {term && `${capitalCase(term.type)}, ${term.year}`}
                </Text>
                <FormControl>
                    <FormLabel fontWeight="bold">Course:</FormLabel>
                    <CourseSelectContainer
                        chooseCourse={changeCourse}
                        chosenCourse={courseId}
                        chosenTerm={termId}
                        maxW="25ch"
                        coordinatorOnly={true}
                    />
                </FormControl>
                <IconButton
                    aria-label="add-course-staff-button"
                    icon={<AddIcon />}
                    colorScheme="green"
                    onClick={onOpen}
                />
                <CourseStaffTableContainer term={termId} course={courseId} />
            </Stack>
            <AddCourseStaffModal isOpen={isOpen} onClose={onClose} />
        </Wrapper>
    );
};
