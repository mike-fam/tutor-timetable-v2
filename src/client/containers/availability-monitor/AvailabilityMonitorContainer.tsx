import { FC, useEffect, useMemo, useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import {
    Box,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useTermCourse } from "../../hooks/useTermCourse";
import { TermResponseType } from "../../types/term";
import {
    useLazyQueryWithError,
    useQueryWithError,
} from "../../hooks/useApolloHooksWithError";
import {
    useCourseStaffsLazyQuery,
    useTermsQuery,
    useTutorAvailabilityLazyQuery,
} from "../../generated/graphql";
import { getCurrentTerm } from "../../utils/term";
import { capitalCase } from "change-case";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { defaultStr } from "../../constants";
import { Loadable } from "../../components/helpers/Loadable";
import { CourseStaffGrid } from "./CourseStaffGrid";
import { CourseStaffResponseType } from "../../types/courseStaff";

import { Map } from "immutable";
import { Timetable } from "../../components/timetable/Timetable";
import { Day } from "../../components/timetable/Day";
import { AvailabilityCustomSessionProps } from "../../components/availabilities/AvailabilitySession";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { SimpleSession } from "../../components/timetable/SimpleSession";
import { SessionTheme } from "../../types/session";

type Props = {};

export const AvailabilityMonitorContainer: FC<Props> = () => {
    const { data: termsData } = useQueryWithError(useTermsQuery, {});
    const { termId, courseId, changeCourse, changeTerm } = useTermCourse();
    const [term, setTerm] = useState<TermResponseType>();

    useEffect(() => {
        if (!termsData) {
            return;
        }
        const currentTerm = getCurrentTerm(termsData.terms);
        changeTerm(currentTerm.id);
        setTerm(currentTerm);
    }, [termsData, changeTerm]);

    const [getCourseStaff, { data: getCourseStaffData }] =
        useLazyQueryWithError(useCourseStaffsLazyQuery, {});
    useEffect(() => {
        if (termId === defaultStr || courseId === defaultStr) {
            return;
        }
        getCourseStaff({
            variables: {
                courseTermInput: {
                    courseId,
                    termId,
                },
            },
        });
    }, [termId, courseId, getCourseStaff]);

    const [courseStaff, setCourseStaff] = useState<
        Map<string, CourseStaffResponseType>
    >(Map<string, CourseStaffResponseType>());
    useEffect(() => {
        if (!getCourseStaffData) {
            return;
        }
        getCourseStaffData.courseStaffs.forEach((courseStaff) => {
            setCourseStaff((prev) => prev.set(courseStaff.id, courseStaff));
        });
    }, [getCourseStaffData]);

    const [tutor, changeTutor] = useState(defaultStr);
    const [getTutorAvailability, { data: tutorAvailability }] =
        useLazyQueryWithError(useTutorAvailabilityLazyQuery, {});
    useEffect(() => {
        if (!tutor) {
            return;
        }
        getTutorAvailability({
            variables: {
                userId: tutor,
            },
        });
    }, [tutor, getTutorAvailability]);

    const sessions = useMemo(() => {
        if (tutorAvailability === undefined) {
            return [];
        }

        return tutorAvailability.tutorAvailability.map((timeslot) => ({
            ...timeslot,
            name: "", // Just to be typesafe
        }));
    }, [tutorAvailability]);

    return (
        <Wrapper>
            <Heading>Availability Monitor</Heading>
            <Stack mt={4} spacing={4} direction="column">
                <Text fontWeight="bold">
                    Term: {term && `${capitalCase(term.type)}, ${term.year}`}
                </Text>
                <FormControl>
                    <FormLabel fontWeight="bold">Course:</FormLabel>
                    <CourseSelectContainer
                        chooseCourse={changeCourse}
                        chosenCourse={courseId}
                        chosenTerm={termId}
                        maxW="25ch"
                        coordinatorOnly={true}
                    />
                </FormControl>
            </Stack>
            <Divider my={4} />
            {termId !== defaultStr && courseId !== defaultStr && (
                <Loadable isLoading={!getCourseStaffData}>
                    <CourseStaffGrid
                        term={termId}
                        course={courseId}
                        courseStaffs={courseStaff.valueSeq().toArray()}
                        currentTutor={tutor}
                        chooseTutor={changeTutor}
                    />
                </Loadable>
            )}
            <Box my={8} />
            <Timetable
                renderDay={(dayProps, key) => (
                    <Day<AvailabilityCustomSessionProps>
                        {...dayProps}
                        renderTimeSlot={(key, time, day) => (
                            <TimeSlot key={key}>
                                <Box w="100%" h="100%"></Box>
                            </TimeSlot>
                        )}
                        renderSession={(sessionProps, key) => (
                            <SimpleSession
                                {...sessionProps}
                                key={key}
                                custom={(sessionId) => ({
                                    theme: SessionTheme.PRIMARY,
                                })}
                            />
                        )}
                        key={key}
                    />
                )}
                sessions={sessions}
            />
        </Wrapper>
    );
};
