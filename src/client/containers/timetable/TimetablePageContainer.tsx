import React, { useContext, useEffect, useState } from "react";
import { useMyCoursesQuery, useTermsQuery } from "../../generated/graphql";
import startOfISOWeek from "date-fns/startOfISOWeek";
import { Wrapper } from "../../components/helpers/Wrapper";
import { Box, Center, Grid, Heading } from "@chakra-ui/react";
import { LoadingSpinner } from "../../components/helpers/LoadingSpinner";
import { CourseCheckboxListContainer } from "./CourseCheckboxListContainer";
import { TermSelectContainer } from "../TermSelectContainer";
import { TimetableContainer } from "./TimetableContainer";
import { WeekNavContainer } from "../WeekNavContainer";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import {
    TimetableContext,
    TimetableSettingsContext,
} from "../../utils/timetable";
import { Set } from "immutable";
import { differenceInWeeks, parseISO } from "date-fns";
import { notSet } from "../../constants";
import { getCurrentTerm } from "../../utils/term";
import {
    firstLineHeight,
    realGap,
    timeSlotHeight,
} from "../../constants/timetable";

type Props = {};

export const TimetablePageContainer: React.FC<Props> = () => {
    const [chosenTerm, setChosenTerm] = useState(notSet);
    const [chosenWeek, setChosenWeek] = useState(notSet);
    const [chosenCourses, setChosenCourses] = useState(() => Set<number>());
    const { dayStartTime, dayEndTime } = useContext(TimetableSettingsContext);
    const { data: termsData, loading: termsLoading } = useQueryWithError(
        useTermsQuery,
        {}
    );
    const {
        data: myCoursesData,
        loading: myCoursesLoading,
    } = useQueryWithError(useMyCoursesQuery, {});
    useEffect(() => {
        // Loading
        if (termsLoading) {
            return;
        }
        const today = new Date();
        // possibly an error happened
        if (!termsData) {
            return;
        }
        // No term date yet.
        if (termsData.terms.length === 0) {
            return;
        }
        let chosenTerm = getCurrentTerm(termsData.terms);
        // choose current week if current term found
        setChosenTerm(chosenTerm.id);
        const startDate = parseISO(chosenTerm.startDate);
        const endDate = parseISO(chosenTerm.endDate);
        // Choose current week if possible, otherwise choose "All weeks"
        setChosenWeek(
            startDate < today && today < endDate
                ? differenceInWeeks(startOfISOWeek(today), startDate)
                : notSet
        );
    }, [myCoursesLoading, termsLoading, termsData, myCoursesData]);

    useEffect(() => {
        if (myCoursesLoading) {
            return;
        }
        if (!myCoursesData) {
            return;
        }
        // No courses data
        if (!myCoursesData.me || myCoursesData.me.courseStaffs.length === 0) {
            return;
        }
        for (const courseStaff of myCoursesData.me.courseStaffs) {
            if (courseStaff.timetable.term.id !== chosenTerm) {
                setChosenCourses((prev) =>
                    prev.remove(courseStaff.timetable.course.id)
                );
            } else {
                setChosenCourses((prev) =>
                    prev.add(courseStaff.timetable.course.id)
                );
            }
        }
    }, [chosenTerm, myCoursesData, myCoursesLoading]);
    return (
        <Wrapper>
            {myCoursesLoading || termsLoading ? (
                <Center h="90vh">
                    <LoadingSpinner />
                </Center>
            ) : (
                <TimetableContext.Provider
                    value={{
                        chosenTermId: chosenTerm,
                        chooseTerm: setChosenTerm,
                        chosenWeek,
                        chooseWeek: setChosenWeek,
                        chosenCourses,
                        setChosenCourses,
                    }}
                >
                    <Grid
                        templateColumns="1fr 4fr"
                        templateRows="repeat(3, auto)"
                    >
                        <Box gridRow="3 / -1">
                            <CourseCheckboxListContainer />
                        </Box>
                        <Box gridColumn={2} gridRow={1} mb={7}>
                            <Heading>Timetable</Heading>
                        </Box>
                        <Box gridColumn={2} gridRow={2} mb={5}>
                            <TermSelectContainer
                                chooseTerm={setChosenTerm}
                                chosenTerm={chosenTerm}
                            />
                        </Box>
                        <Box
                            gridColumn={2}
                            gridRow={3}
                            mb={5}
                            h={
                                firstLineHeight +
                                (dayEndTime - dayStartTime) *
                                    (timeSlotHeight + realGap) +
                                realGap
                            }
                        >
                            <TimetableContainer />
                        </Box>
                        <Box gridColumn={2} gridRow={4}>
                            <WeekNavContainer />
                        </Box>
                    </Grid>
                </TimetableContext.Provider>
            )}
        </Wrapper>
    );
};
