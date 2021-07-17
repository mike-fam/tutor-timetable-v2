import React from "react";
import { useSessionSettings } from "../../hooks/useSessionSettings";
import { TermSelectContainer } from "../TermSelectContainer";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { Wrapper } from "../../components/helpers/Wrapper";
import {
    Button,
    Heading,
    HStack,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import { SessionSettingsTimetableContainer } from "./SessionSettingsTimetableContainer";
import { defaultInt, defaultStr } from "../../constants";
import { WeekNav } from "../../components/WeekNav";
import { FetchFromTimetableModal } from "./FetchFromTimetableModal";
import { StreamDrawer } from "../../components/session-settings/StreamDrawer";

type Props = {};

export const SessionSettingsPageContainer: React.FC<Props> = () => {
    const { base, loading, selection, timetableState, actions } =
        useSessionSettings();
    const {
        courseId,
        termId,
        changeCourse,
        changeTerm,
        chooseWeek,
        week,
        course,
        term,
    } = base;
    const { selectedStreams, selectedSessions, selectedStreamInput } =
        selection;
    const {
        isOpen: isFetchModalOpen,
        onClose: closeFetchModal,
        onOpen: openFetchModal,
    } = useDisclosure();
    const {
        isOpen: isStreamDrawerOpen,
        onClose: closeStreamDrawer,
        onOpen: openStreamDrawer,
    } = useDisclosure();
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
                {termId !== defaultStr && courseId !== defaultStr && (
                    <>
                        <HStack justify="flex-end">
                            {week === defaultInt
                                ? selectedStreams.size > 0 && (
                                      <Button
                                          colorScheme="green"
                                          onClick={openStreamDrawer}
                                      >
                                          Edit Session Streams
                                      </Button>
                                  )
                                : selectedSessions.size > 0 && (
                                      <Button colorScheme="green">
                                          Edit Sessions
                                      </Button>
                                  )}
                            <Button colorScheme="green">
                                Generate Allocation
                            </Button>
                            <Button
                                colorScheme="green"
                                onClick={openFetchModal}
                            >
                                Fetch from Public Timetable
                            </Button>
                            <Button colorScheme="blue">Apply changes</Button>
                        </HStack>
                        <SessionSettingsTimetableContainer
                            loading={loading}
                            timetableState={timetableState}
                            timetableActions={actions}
                            selectActions={selection}
                            baseInfo={base}
                            week={week}
                        />
                        <WeekNav
                            chooseWeek={chooseWeek}
                            chosenWeek={week}
                            weekNames={term?.weekNames || []}
                            weeksNum={term?.numberOfWeeks || 0}
                        />
                    </>
                )}
            </Stack>
            <FetchFromTimetableModal
                fetchFromTimetable={actions.getStreamsFromPublicTimetable}
                isOpen={isFetchModalOpen}
                onClose={closeFetchModal}
                course={course}
                term={term}
            />
            <StreamDrawer
                isOpen={isStreamDrawerOpen}
                close={closeStreamDrawer}
                stream={selectedStreamInput}
            />
        </Wrapper>
    );
};

// TODO: change props of timetable container
