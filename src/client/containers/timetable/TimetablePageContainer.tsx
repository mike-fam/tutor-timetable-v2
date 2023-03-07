import { FC, useContext, useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import { Box, Center, Grid, Heading } from "@chakra-ui/react";
import { LoadingSpinner } from "../../components/helpers/LoadingSpinner";
import { CourseCheckboxListContainer } from "./CourseCheckboxListContainer";
import { TermSelectContainer } from "../TermSelectContainer";
import { TimetableContainer } from "./TimetableContainer";
import { WeekNavContainer } from "../WeekNavContainer";
import {
    TimetableContext,
    TimetableSettingsContext,
} from "../../utils/timetable";
import { Set } from "immutable";
import {
    firstLineHeight,
    realGap,
    timetableTimeslotHeight,
} from "../../constants/timetable";
import { useDefaultTerm } from "../../hooks/useDefaultTerm";

type Props = {};

export const TimetablePageContainer: FC<Props> = () => {
    document.title = "Tutor Timetable";
    const [chosenCourses, setChosenCourses] = useState(() => Set<string>());
    const { dayStartTime, dayEndTime } = useContext(TimetableSettingsContext);
    const {
        termsLoading,
        chosenTermId,
        setChosenTermId,
        setChosenWeek,
        chosenWeek,
    } = useDefaultTerm();

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
                        templateColumns="1fr 6fr"
                        templateRows="repeat(3, auto)"
                        width="100%"
                        maxWidth="1400px"
                        mx="auto"
                    >
                        <Box gridRow="3 / -1">
                            <CourseCheckboxListContainer
                                chosenCourses={chosenCourses}
                                setChosenCourses={setChosenCourses}
                                chosenTermId={chosenTermId}
                            />
                        </Box>
                        <Box gridColumn={2} gridRow={1} mb={7}>
                            <Heading>Timetable</Heading>
                        </Box>
                        <Box gridColumn={2} gridRow={2} mb={5}>
                            <TermSelectContainer
                                chooseTerm={setChosenTermId}
                                chosenTerm={chosenTermId}
                            />
                        </Box>
                        <Box
                            gridColumn={2}
                            gridRow={3}
                            mb={5}
                            h={
                                firstLineHeight +
                                (dayEndTime - dayStartTime) *
                                    (timetableTimeslotHeight + realGap) +
                                realGap
                            }
                        >
                            <TimetableContainer />
                        </Box>
                        <Box gridColumn={2} gridRow={4} mb={2}>
                            <WeekNavContainer />
                        </Box>
                    </Grid>
                </TimetableContext.Provider>
            )}
        </Wrapper>
    );
};
