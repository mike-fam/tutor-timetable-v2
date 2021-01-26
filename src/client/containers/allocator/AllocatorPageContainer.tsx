import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import { TermSelectContainer } from "../TermSelectContainer";
import { notSet } from "../../constants";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { AllocatorStaffCheckboxList } from "./AllocatorStaffCheckboxList";
import { AllocatorTimetableContainer } from "./AllocatorTimetableContainer";
import { useTermCourse } from "../../hooks/useTermCourse";

type Props = {};

export const AllocatorPageContainer: React.FC<Props> = ({}) => {
    const { term, changeTerm, course, changeCourse } = useTermCourse();
    return (
        <Wrapper>
            <Stack spacing={4}>
                <Heading as="h1">Allocator</Heading>
                <Text fontSize="2xl" fontWeight="light" as="h2" pt={6}>
                    Choose a timetable to generate allocation for:
                </Text>
                <HStack spacing={6}>
                    <TermSelectContainer
                        chooseTerm={changeTerm}
                        chosenTerm={term}
                        maxW="33%"
                    />
                    <CourseSelectContainer
                        chosenTerm={term}
                        chosenCourse={course}
                        chooseCourse={changeCourse}
                        maxW="33%"
                        coordinatorOnly={true}
                    />
                </HStack>
                {course !== notSet && term !== notSet ? (
                    <>
                        <Text fontSize="2xl" fontWeight="light" as="h2" pt={8}>
                            Choose staff members to be included in the generated
                            allocation:
                        </Text>
                        <AllocatorStaffCheckboxList
                            courseId={course}
                            termId={term}
                        />
                        <Text fontSize="2xl" fontWeight="light" as="h2" pt={8}>
                            Timetable preview (No allocation yet generated):
                        </Text>
                        <AllocatorTimetableContainer
                            courseId={course}
                            termId={term}
                        />
                    </>
                ) : null}
            </Stack>
        </Wrapper>
    );
};
