import React from "react";
import { useSessionSettings } from "../../hooks/useSessionSettings";
import { TermSelectContainer } from "../TermSelectContainer";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { Wrapper } from "../../components/helpers/Wrapper";
import { Heading, HStack, Stack } from "@chakra-ui/react";
import { SessionSettingsTimetableContainer } from "./SessionSettingsTimetableContainer";
import { Map } from "immutable";
import { TimetableSessionProps } from "../../components/timetable/TimetableSession";

type Props = {};

export const SessionSettingsPageContainer: React.FC<Props> = () => {
    const { courseId, termId, changeCourse, changeTerm } = useSessionSettings();
    return (
        <Wrapper>
            <Stack spacing={4}>
                <Heading as="h1">Session Settings</Heading>
                <HStack spacing={6}>
                    <TermSelectContainer
                        chooseTerm={changeTerm}
                        chosenTerm={termId}
                        maxW="33%"
                    />
                    <CourseSelectContainer
                        chosenTerm={termId}
                        chosenCourse={courseId}
                        chooseCourse={changeCourse}
                        maxW="33%"
                        coordinatorOnly={true}
                    />
                </HStack>
                <SessionSettingsTimetableContainer
                    sessions={[]}
                    loading={true}
                    sessionsData={Map<string, TimetableSessionProps>()}
                />
            </Stack>
        </Wrapper>
    );
};

// TODO: change props of timetable container
