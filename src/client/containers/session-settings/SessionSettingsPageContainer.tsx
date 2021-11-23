import React from "react";
import { useSessionSettings } from "../../hooks/useSessionSettings";
import { TermSelectContainer } from "../TermSelectContainer";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { Wrapper } from "../../components/helpers/Wrapper";
import {
    Button,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import { SessionSettingsTimetableContainer } from "./SessionSettingsTimetableContainer";
import { defaultInt, defaultStr } from "../../constants";
import { WeekNav } from "../../components/WeekNav";
import { FetchFromTimetableModal } from "./FetchFromTimetableModal";
import { StreamSettingsDrawer } from "../../components/session-settings/StreamSettingsDrawer";
import { useUsersOfCourse } from "../../hooks/useUsersOfCourse";
import { AllocatorModal } from "./AllocatorModal";
import { formatTerm } from "../../utils/term";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
        selectedStreams,
        selectedSessions,
        selectedStreamInput,
        deselectAllStreams,
    } = selection;
    const { streamActions } = timetableState;
    const { deleteSelectedStreams, editMultipleStreamSettings } = streamActions;
    const { submitChanges, requestAllocation, checkAllocation } = actions;
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
    const {
        isOpen: isAllocatorModalOpen,
        onClose: closeAllocatorModal,
        onOpen: openAllocatorModal,
    } = useDisclosure();
    const users = useUsersOfCourse(courseId, termId);
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
                                      <>
                                          <Button
                                              colorScheme="green"
                                              onClick={() =>
                                                  deselectAllStreams()
                                              }
                                          >
                                              Deselect All
                                          </Button>
                                          <Button
                                              colorScheme="green"
                                              onClick={openStreamDrawer}
                                          >
                                              Edit Session Streams
                                          </Button>
                                      </>
                                  )
                                : selectedSessions.size > 0 && (
                                      <Button colorScheme="green">
                                          Edit Sessions
                                      </Button>
                                  )}
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                    colorScheme="green"
                                >
                                    Tools
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup title="Allocation">
                                        <MenuItem
                                            onClick={() => {
                                                openAllocatorModal();
                                            }}
                                        >
                                            Request Allocation
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                checkAllocation(
                                                    courseId,
                                                    termId
                                                );
                                            }}
                                        >
                                            Check Allocation
                                        </MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup title="Sessions">
                                        <MenuItem
                                            onClick={() => {
                                                openFetchModal();
                                            }}
                                        >
                                            Fetch from Public Timetable
                                        </MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>
                            <Button
                                colorScheme="blue"
                                onClick={() => submitChanges()}
                            >
                                Apply changes
                            </Button>
                        </HStack>
                        <SessionSettingsTimetableContainer
                            loading={loading}
                            timetableState={timetableState}
                            selectActions={selection}
                            baseInfo={base}
                            week={week}
                            openStreamDrawer={openStreamDrawer}
                            users={users}
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
            <StreamSettingsDrawer
                isOpen={isStreamDrawerOpen}
                close={closeStreamDrawer}
                stream={selectedStreamInput}
                weekNames={term?.weekNames || []}
                numberOfWeeks={term?.numberOfWeeks || 0}
                onSave={editMultipleStreamSettings}
                deleteStreams={() => {
                    deselectAllStreams();
                    deleteSelectedStreams();
                    closeStreamDrawer();
                }}
                users={users}
            />
            <AllocatorModal
                isOpen={isAllocatorModalOpen}
                close={closeAllocatorModal}
                users={users}
                onSubmit={(users, timeout) => {
                    requestAllocation(courseId, termId, users, timeout);
                }}
                courseCode={course?.code || ""}
                termName={term ? formatTerm(term) : ""}
            />
        </Wrapper>
    );
};
