import React from "react";
import { useSessionSettings } from "../../hooks/useSessionSettings";
import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { TermSelectContainer } from "../TermSelectContainer";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { Wrapper } from "../../components/helpers/Wrapper";

type Props = {};

export const SessionSettingsPageContainer: React.FC<Props> = () => {
    const { courseId, termId, setCourseId, setTermId } = useSessionSettings();
    return (
        <Wrapper>
            <Stack spacing={4}>
                <Heading as="h1">Session Settings</Heading>
                <Text fontSize="2xl" fontWeight="light" as="h2" pt={6}>
                    Choose a timetable to generate allocation for:
                </Text>
                <HStack spacing={6}>
                    <TermSelectContainer
                        chooseTerm={setTermId}
                        chosenTerm={termId}
                        maxW="33%"
                    />
                    <CourseSelectContainer
                        chosenTerm={termId}
                        chosenCourse={courseId}
                        chooseCourse={setCourseId}
                        maxW="33%"
                        coordinatorOnly={true}
                    />
                </HStack>
            </Stack>
        </Wrapper>
    );
};
