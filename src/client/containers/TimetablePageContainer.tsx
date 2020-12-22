import React, { useContext, useEffect, useState } from "react";
import { IsoDay } from "../../types/date";
import { TimetableContext } from "../utils/timetable";
import { Map } from "immutable";
import { useMeQuery, useTermsQuery } from "../generated/graphql";
import { ErrorContext } from "../utils/errors";
import { Wrapper } from "../components/Wrapper";
import { Box, Center, Grid, Heading, Spinner } from "@chakra-ui/react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { CourseSelectContainer } from "./CourseSelectContainer";
import { TermSelectContainer } from "./TermSelectContainer";
import { TimetableContainer } from "./TimetableContainer";
import { WeekNavContainer } from "./WeekNavContainer";

type Props = {};

export const TimetablePageContainer: React.FC<Props> = () => {
    const {
        data: termsData,
        loading: termLoading,
        error: termsError,
    } = useTermsQuery();
    const { data: meData, loading: meLoading, error: meError } = useMeQuery();
    const { addError } = useContext(ErrorContext);
    useEffect(() => {
        if (meError) {
            addError(meError);
        }
    }, [meError, addError]);
    useEffect(() => {
        if (termsError) {
            addError(termsError);
        }
    }, [termsError, addError]);
    return (
        <Wrapper>
            {meLoading || termLoading ? (
                <Center h="90vh">
                    <LoadingSpinner />
                </Center>
            ) : (
                <Grid templateColumns="1fr 4fr" templateRows="repeat(3, auto)">
                    <Box gridRow="3 / -1">
                        <CourseSelectContainer />
                    </Box>
                    <Box gridColumn={2} gridRow={1}>
                        <Heading>Timetable</Heading>
                    </Box>
                    <Box gridColumn={2} gridRow={2}>
                        <TermSelectContainer />
                    </Box>
                    <Box gridColumn={2} gridRow={3}>
                        <TimetableContainer />
                    </Box>
                    <Box gridColumn={2} gridRow={4}>
                        <WeekNavContainer />
                    </Box>
                </Grid>
            )}
        </Wrapper>
    );
};
