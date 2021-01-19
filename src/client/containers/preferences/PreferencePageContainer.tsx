import React, { useCallback, useState } from "react";
import { TermSelectContainer } from "../TermSelectContainer";
import { notSet } from "../../constants";
import { Wrapper } from "../../components/helpers/Wrapper";
import { PreferenceUpdateContainer } from "./PreferenceUpdateContainer";
import { Divider, Flex, FormLabel, Heading } from "@chakra-ui/react";
import { CourseSelectContainer } from "../CourseSelectContainer";

type Props = {};

export const PreferencePageContainer: React.FC<Props> = ({}) => {
    const [chosenTermId, setChosenTermId] = useState(notSet);
    const [chosenCourseId, setChosenCourseId] = useState(notSet);
    const changeTerm = useCallback((termId) => {
        setChosenTermId(termId);
        setChosenCourseId(notSet);
    }, []);
    return (
        <Wrapper>
            <Flex direction="column" w="50%">
                <Heading>Preferences</Heading>
                <Divider my={5} />
                <FormLabel mt={3}>Term</FormLabel>
                <TermSelectContainer
                    chooseTerm={changeTerm}
                    chosenTerm={chosenTermId}
                />
                <FormLabel mt={3}>Course</FormLabel>
                <CourseSelectContainer
                    chosenTerm={chosenTermId}
                    chooseCourse={setChosenCourseId}
                    chosenCourse={chosenCourseId}
                />
                <PreferenceUpdateContainer
                    courseId={chosenCourseId}
                    termId={chosenTermId}
                />
            </Flex>
        </Wrapper>
    );
};
