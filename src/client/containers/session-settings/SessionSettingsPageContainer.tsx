import React, { useState } from "react";
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
import { EditMode } from "../../types/session-settings";
import { defaultStr } from "../../constants";
import { EditModeChooser } from "../../components/session-settings/EditModeChooser";
import { WeekNav } from "../../components/WeekNav";
import { FetchFromTimetableModal } from "./FetchFromTimetableModal";

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
    const {
        isOpen: isFetchModalOpen,
        onClose: closeFetchModal,
        onOpen: openFetchModal,
    } = useDisclosure();
    const [editMode, setEditMode] = useState<EditMode>(EditMode.SETTINGS);
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
                        <EditModeChooser changeEditMode={setEditMode} />
                        <HStack>
                            {editMode === EditMode.ALLOCATION ? (
                                <Button ml="auto" colorScheme="green">
                                    Generate Allocation
                                </Button>
                            ) : (
                                <Button
                                    ml="auto"
                                    colorScheme="green"
                                    onClick={openFetchModal}
                                >
                                    Fetch from Public Timetable
                                </Button>
                            )}
                            <Button colorScheme="blue">Apply changes</Button>
                        </HStack>
                        <SessionSettingsTimetableContainer
                            loading={loading}
                            timetableState={timetableState}
                            timetableActions={actions}
                            selectActions={selection}
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
        </Wrapper>
    );
};

// TODO: change props of timetable container
