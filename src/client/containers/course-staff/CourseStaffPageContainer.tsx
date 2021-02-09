import React, { useCallback, useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { CourseSelectContainer } from "../CourseSelectContainer";
import {
    useLazyQueryWithError,
    useMutationWithError,
    useQueryWithError,
} from "../../hooks/useQueryWithError";
import {
    Role,
    useAddCourseStaffMutation,
    useCourseStaffsLazyQuery,
    useTermsQuery,
} from "../../generated/graphql";
import { getCurrentTerm } from "../../utils/term";
import { useTermCourse } from "../../hooks/useTermCourse";
import { TermResponseType } from "../../types/term";
import { Wrapper } from "../../components/helpers/Wrapper";
import { capitalCase } from "change-case";
import { CourseStaffTableContainer } from "./CourseStaffTableContainer";
import { AddCourseStaffModal } from "./AddCourseStaffModal";
import { notSet } from "../../constants";
import {
    CourseStaffResponseType,
    StaffSeniority,
} from "../../types/courseStaff";
import { Map } from "immutable";
import { Loadable } from "../../components/helpers/Loadable";
import { HelpIcon } from "../../components/helpers/HelpIcon";

type Props = {};

export const CourseStaffPageContainer: React.FC<Props> = ({}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const { termId, courseId, changeCourse, changeTerm } = useTermCourse();
    const [term, setTerm] = useState<TermResponseType>();
    const [
        addCourseStaff,
        { data: addCourseStaffData, loading: addCourseStaffLoading },
    ] = useMutationWithError(useAddCourseStaffMutation);
    const [
        getCourseStaff,
        { data: getCourseStaffData },
    ] = useLazyQueryWithError(useCourseStaffsLazyQuery);
    useEffect(() => {
        if (termId === notSet || courseId === notSet) {
            return;
        }
        getCourseStaff({
            variables: {
                courseTermInput: {
                    courseId,
                    termId,
                },
            },
        });
    }, [termId, courseId, getCourseStaff]);
    const [courseStaff, setCourseStaff] = useState<
        Map<number, CourseStaffResponseType>
    >(Map());
    useEffect(() => {
        if (!addCourseStaffData) {
            return;
        }
        addCourseStaffData.addUsersToCourse.forEach((courseStaff) => {
            setCourseStaff((prev) => prev.set(courseStaff.id, courseStaff));
        });
    }, [addCourseStaffData]);
    useEffect(() => {
        if (!getCourseStaffData) {
            return;
        }
        getCourseStaffData.courseStaffs.forEach((courseStaff) => {
            setCourseStaff((prev) => prev.set(courseStaff.id, courseStaff));
        });
    }, [getCourseStaffData]);
    useEffect(() => {
        if (!termsData) {
            return;
        }
        const currentTerm = getCurrentTerm(termsData.terms);
        changeTerm(currentTerm.id);
        setTerm(currentTerm);
    }, [termsData, changeTerm]);
    const addStaff = useCallback(
        (values: {
            usernames: string[];
            role: Role;
            isNew: StaffSeniority;
        }) => {
            console.log("Adding course staff");
            addCourseStaff({
                variables: {
                    usernames: values.usernames,
                    courseStaffInput: {
                        courseId,
                        termId,
                        isNew: values.isNew === StaffSeniority.NEW,
                        role: values.role,
                    },
                },
            });
        },
        [courseId, termId, addCourseStaff]
    );
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
                <Stack direction="row" justifyContent="flex-end">
                    {courseId !== notSet && termId !== notSet && (
                        <Button colorScheme="green" onClick={onOpen}>
                            Add Staff
                        </Button>
                    )}
                </Stack>
                {termId !== notSet && courseId !== notSet && (
                    <Loadable isLoading={!getCourseStaffData}>
                        <Box h="80vh" overflow="auto">
                            <CourseStaffTableContainer
                                term={termId}
                                course={courseId}
                                courseStaffs={courseStaff.valueSeq().toArray()}
                            />
                        </Box>
                    </Loadable>
                )}
            </Stack>
            <AddCourseStaffModal
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={addStaff}
                loading={addCourseStaffLoading}
            />
        </Wrapper>
    );
};
