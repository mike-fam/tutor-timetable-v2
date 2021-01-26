import React from "react";
import { TermSelectContainer } from "../TermSelectContainer";
import { Wrapper } from "../../components/helpers/Wrapper";
import { PreferenceUpdateContainer } from "./PreferenceUpdateContainer";
import { Divider, Flex, FormLabel, Heading } from "@chakra-ui/react";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { useTermCourse } from "../../hooks/useTermCourse";

type Props = {};

export const PreferencePageContainer: React.FC<Props> = () => {
    const { term, changeTerm, course, changeCourse } = useTermCourse();
    return (
        <Wrapper>
            <Flex direction="column" w="50%">
                <Heading>Preferences</Heading>
                <Divider my={5} />
                <FormLabel mt={3}>Term</FormLabel>
                <TermSelectContainer
                    chooseTerm={changeTerm}
                    chosenTerm={term}
                />
                <FormLabel mt={3}>Course</FormLabel>
                <CourseSelectContainer
                    chosenTerm={term}
                    chosenCourse={course}
                    chooseCourse={changeCourse}
                />
                <PreferenceUpdateContainer courseId={course} termId={term} />
            </Flex>
        </Wrapper>
    );
};
