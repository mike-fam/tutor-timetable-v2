import React, { useEffect, useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Stack,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
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

type Props = {};

export const CourseStaffPageContainer: React.FC<Props> = ({}) => {
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
            <Stack mt={4} spacing={4}>
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
                <CourseStaffTableContainer term={termId} course={courseId} />
            </Stack>
        </Wrapper>
    );
};
