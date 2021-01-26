import { Heading, HStack, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import { TermSelectContainer } from "../TermSelectContainer";
import { notSet } from "../../constants";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { AllocatorStaffCheckboxList } from "./AllocatorStaffCheckboxList";
import { AllocatorTimetableContainer } from "./AllocatorTimetableContainer";

type Props = {};

export const AllocatorPageContainer: React.FC<Props> = ({}) => {
    const [term, setTerm] = useState(notSet);
    const [course, setCourse] = useState(notSet);
    return (
        <Wrapper>
            <Stack spacing={4}>
                <Heading>Allocator</Heading>
                <HStack spacing={6}>
                    <TermSelectContainer
                        chooseTerm={setTerm}
                        chosenTerm={term}
                        maxW="33%"
                    />
                    <CourseSelectContainer
                        chosenTerm={term}
                        chosenCourse={course}
                        chooseCourse={setCourse}
                        maxW="33%"
                        coordinatorOnly={true}
                    />
                </HStack>
                <AllocatorStaffCheckboxList courseId={course} termId={term} />
                <AllocatorTimetableContainer courseId={course} termId={term} />
            </Stack>
        </Wrapper>
    );
};
