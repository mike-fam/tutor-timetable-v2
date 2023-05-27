import { Component, FC, ReactNode, useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import {
    Box,
    Center,
    Flex,
    Grid,
    Heading,
    IconButton,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import { LoadingSpinner } from "../../components/helpers/LoadingSpinner";
import { TermSelectContainer } from "../TermSelectContainer";
import { TimetableContainer } from "./TimetableContainer";
import { WeekNavContainer } from "../WeekNavContainer";
import { TimetableContext } from "../../utils/timetable";
import { Set } from "immutable";
import { useDefaultTerm } from "../../hooks/useDefaultTerm";
import { CourseCheckboxListContainer2 } from "./CourseCheckboxListContainer2";
import { IoSettingsSharp, IoDownloadOutline } from "react-icons/io5";
import { TimetableSettingsModal } from "../TimetableSettingsModal";
import { TimetableExportModalContainer } from "./TimetableExportModalContainer";

type Props = {};

class HStack extends Component<{
    mt: number;
    gridColumn: string;
    direction: string;
    children: ReactNode;
}> {
    render() {
        return null;
    }
}

export const TimetablePageContainer: FC<Props> = () => {
    document.title = "Tutor Timetable";
    const [chosenCourses, setChosenCourses] = useState(() => Set<string>());
    const {
        termsLoading,
        chosenTermId,
        setChosenTermId,
        setChosenWeek,
        chosenWeek,
    } = useDefaultTerm();
    const {
        isOpen: isTimetableSettingsModalOpen,
        onClose: closeTimetableSettingsModal,
        onOpen: openTimetableSettingsModal,
    } = useDisclosure();
    const {
        isOpen: isTimetableExportModalOpen,
        onClose: closeTimetableExportModal,
        onOpen: openTimetableExportModal,
    } = useDisclosure();
    return (
        <Wrapper>
            {termsLoading ? (
                <Center h="90vh">
                    <LoadingSpinner />
                </Center>
            ) : (
                <TimetableContext.Provider
                    value={{
                        chosenTermId,
                        chooseTerm: setChosenTermId,
                        chosenWeek,
                        chooseWeek: setChosenWeek,
                        chosenCourses,
                        setChosenCourses,
                    }}
                >
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        templateRows="repeat(3, auto)"
                        width="100%"
                        maxWidth="1400px"
                        mx="auto"
                        columnGap={5}
                    >
                        <Box gridColumn="1 / -1" mb={7}>
                            <Heading>Timetable</Heading>
                        </Box>
                        <Box>
                            <TermSelectContainer
                                chooseTerm={setChosenTermId}
                                chosenTerm={chosenTermId}
                            />
                        </Box>
                        <Box>
                            <CourseCheckboxListContainer2
                                chosenCourses={chosenCourses}
                                setChosenCourses={setChosenCourses}
                                chosenTermId={chosenTermId}
                            />
                        </Box>
                        <Stack
                            gridColumn="1 / -1"
                            direction="row-reverse"
                            mt={2}
                            spacing={2}
                        >
                            <IconButton
                                variant="outline"
                                aria-label="Timetable Settings"
                                fontSize="20px"
                                icon={<IoSettingsSharp />}
                                isRound
                                onClick={openTimetableSettingsModal}
                            />
                            <IconButton
                                variant="outline"
                                aria-label="Timetable Export"
                                fontSize="20px"
                                icon={<IoDownloadOutline />}
                                isRound
                                onClick={openTimetableExportModal}
                            />
                        </Stack>
                        <Box gridColumn="1 / -1" my={2}>
                            <TimetableContainer />
                        </Box>
                        <Box gridColumn="1 / -1" mb={2}>
                            <WeekNavContainer />
                        </Box>
                    </Grid>
                </TimetableContext.Provider>
            )}
            <TimetableSettingsModal
                isOpen={isTimetableSettingsModalOpen}
                onClose={closeTimetableSettingsModal}
            />
            <TimetableExportModalContainer
                isOpen={isTimetableExportModalOpen}
                onClose={closeTimetableExportModal}
                chosenTermId={chosenTermId}
            />
        </Wrapper>
    );
};
