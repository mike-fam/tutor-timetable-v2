import React, { useEffect, useState } from "react";
import { useMyCoursesQuery, useTermsQuery } from "../generated/graphql";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";
import startOfISOWeek from "date-fns/startOfISOWeek";
import maxBy from "lodash/maxBy";
import { Wrapper } from "../components/helpers/Wrapper";
import { Box, Center, Grid, Heading } from "@chakra-ui/react";
import { LoadingSpinner } from "../components/helpers/LoadingSpinner";
import { CourseSelectContainer } from "./CourseSelectContainer";
import { TermSelectContainer } from "./TermSelectContainer";
import { TimetableContainer } from "./TimetableContainer";
import { WeekNavContainer } from "./WeekNavContainer";
import { useQueryWithError } from "../hooks/useQueryWithError";
import { TimetableContext } from "../utils/timetable";
import { Set } from "immutable";
import { differenceInWeeks, parseISO } from "date-fns";

type Props = {};

export const TimetablePageContainer: React.FC<Props> = () => {
    const [chosenTerm, setChosenTerm] = useState(-1);
    const [chosenWeek, setChosenWeek] = useState(-1);
    const [chosenCourses, setChosenCourses] = useState(() => Set<number>());
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
        if (myCoursesLoading || termsLoading) {
            return;
        }
        const today = new Date();
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
        let foundTerm = false;
        let chosenTermId = -1;
        // Choose current term by default
        for (const term of termsData.terms) {
            if (
                isBefore(today, parseISO(term.endDate)) &&
                isAfter(today, parseISO(term.startDate))
            ) {
                setChosenTerm(term.id);
                console.log("found good term");
                foundTerm = true;
                chosenTermId = term.id;
                break;
            }
        }
        // no suitable term, set chosen term to the latest.
        if (!foundTerm) {
            console.log(
                "not found term",
                maxBy(termsData.terms, (term) => term.startDate)!.id
            );
            setChosenTerm(maxBy(termsData.terms, (term) => term.startDate)!.id);
        } else {
            // choose current week if current term found
            const startDate = parseISO(termsData.terms[chosenTermId].startDate);
            const endDate = parseISO(termsData.terms[chosenTermId].endDate);
            // Choose current week if possible, otherwise choose "All weeks"
            setChosenWeek(
                startDate < today && today < endDate
                    ? differenceInWeeks(startOfISOWeek(today), startDate)
                    : -1
            );
        }
        // No courses data
        if (!myCoursesData.me || myCoursesData.me.courseStaffs.length === 0) {
            return;
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
                            <CourseSelectContainer />
                        </Box>
                        <Box gridColumn={2} gridRow={1} mb={7}>
                            <Heading>Timetable</Heading>
                        </Box>
                        <Box gridColumn={2} gridRow={2} mb={5}>
                            <TermSelectContainer />
                        </Box>
                        <Box gridColumn={2} gridRow={3} mb={5}>
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
