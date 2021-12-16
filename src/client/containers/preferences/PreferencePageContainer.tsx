import { FC } from "react";
import { TermSelectContainer } from "../TermSelectContainer";
import { Wrapper } from "../../components/helpers/Wrapper";
import { PreferenceUpdateContainer } from "./PreferenceUpdateContainer";
import { Divider, Flex, FormLabel, Heading } from "@chakra-ui/react";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { useTermCourse } from "../../hooks/useTermCourse";

type Props = {};

export const PreferencePageContainer: FC<Props> = () => {
    const { termId, changeTerm, courseId, changeCourse } = useTermCourse();
    return (
        <Wrapper>
            <Flex direction="column" w="50%">
                <Heading>Preferences</Heading>
                <Divider my={5} />
                <FormLabel mt={3}>Term</FormLabel>
                <TermSelectContainer
                    chooseTerm={changeTerm}
                    chosenTerm={termId}
                />
                <FormLabel mt={3}>Course</FormLabel>
                <CourseSelectContainer
                    chosenTerm={termId}
                    chosenCourse={courseId}
                    chooseCourse={changeCourse}
                />
                <PreferenceUpdateContainer
                    courseId={courseId}
                    termId={termId}
                />
            </Flex>
        </Wrapper>
    );
};
