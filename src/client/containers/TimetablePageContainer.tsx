import React, { useContext, useEffect, useState } from "react";
import { Term, useMyCoursesQuery, useTermsQuery } from "../generated/graphql";
import { ErrorContext } from "../utils/errors";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";
import startOfISOWeek from "date-fns/startOfISOWeek";
import differenceInWeeks from "date-fns/differenceInWeeks";
import maxBy from "lodash/maxBy";
import { Wrapper } from "../components/Wrapper";
import { Box, Center, Grid, Heading } from "@chakra-ui/react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { CourseSelectContainer } from "./CourseSelectContainer";
import { TermSelectContainer } from "./TermSelectContainer";
import { TimetableContainer } from "./TimetableContainer";
import { WeekNavContainer } from "./WeekNavContainer";
import { useErrorQuery } from "../hooks/useErrorQuery";
import { TimetableContext } from "../utils/timetable";
import { Set } from "immutable";
import { IsoDay } from "../../types/date";
import { parseISO } from "date-fns";

type Props = {};

export const TimetablePageContainer: React.FC<Props> = () => {
    const { addError } = useContext(ErrorContext);
    const [chosenTerm, setChosenTerm] = useState(-1);
    const [chosenWeek, setChosenWeek] = useState(0);
    const [chosenCourses, setChosenCourses] = useState(() => Set<number>());
    const [displayedDays, setDisplayedDays] = useState(
        Set([
            IsoDay.Mon,
            IsoDay.Tue,
            IsoDay.Wed,
            IsoDay.Thu,
            IsoDay.Fri,
            IsoDay.Sat,
            IsoDay.Sun,
        ])
    );
    const { data: termsData, loading: termsLoading } = useErrorQuery(
        useTermsQuery
    );
    const { data: myCoursesData, loading: myCoursesLoading } = useErrorQuery(
        useMyCoursesQuery
    );
    useEffect(() => {
        // Loading
        if (myCoursesLoading || termsLoading) {
            return;
        }
        const today = new Date();
        let foundTerm = false;
        let chosenTerm: Omit<Term, "timetables"> | null = null;
        // possibly an error happened
        if (!termsData) {
            return;
        }
        if (!myCoursesData) {
            return;
        }
        // No term date yet.
        if (termsData.terms.length === 0) {
            return;
        }
        // No courses data
        if (!myCoursesData.me || myCoursesData.me.courseStaffs.length === 0) {
            return;
        }
        console.log(termsData.terms);
        // Choose current term by default
        for (const term of termsData.terms) {
            if (
                isBefore(today, parseISO(term.endDate)) &&
                isAfter(today, parseISO(term.startDate))
            ) {
                setChosenTerm(term.id);
                chosenTerm = term;
                foundTerm = true;
                break;
            }
        }
        // no suitable term, set chosen term to the latest.
        if (!foundTerm) {
            setChosenTerm(maxBy(termsData.terms, (term) => term.startDate)!.id);
        } else {
            // choose current week if current term found
            setChosenWeek(
                differenceInWeeks(
                    startOfISOWeek(today),
                    parseISO(chosenTerm!.startDate)
                )
            );
        }
        for (const courseStaff of myCoursesData.me.courseStaffs) {
            setChosenCourses((prev) =>
                prev.add(courseStaff.timetable.course.id)
            );
        }
    }, [myCoursesLoading, termsLoading, termsData, myCoursesData]);

    return (
        <Wrapper>
            {myCoursesLoading || termsLoading ? (
                <Center h="90vh">
                    <LoadingSpinner />
                </Center>
            ) : (
                <TimetableContext.Provider
                    value={{
                        chosenTerm,
                        chooseTerm: setChosenTerm,
                        chosenWeek,
                        chooseWeek: setChosenWeek,
                        displayedDays,
                        setDisplayedDays,
                        chosenCourses,
                        setChosenCourses,
                    }}
                >
                    <Grid
                        templateColumns="1fr 4fr"
                        templateRows="repeat(3, auto)"
                    >
                        <Box gridRow="3 / -1">
                            <CourseSelectContainer />
                        </Box>
                        <Box gridColumn={2} gridRow={1} mb={7}>
                            <Heading>Timetable</Heading>
                        </Box>
                        <Box gridColumn={2} gridRow={2} mb={5}>
                            <TermSelectContainer />
                        </Box>
                        <Box gridColumn={2} gridRow={3}>
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
