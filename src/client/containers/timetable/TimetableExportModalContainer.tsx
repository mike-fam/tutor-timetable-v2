import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import ical from "ical-generator";
import { FC, useEffect, useState } from "react";
import { TimetableDisplayMode } from "../../types/timetable";
import { FormikRadioGroup } from "../../components/helpers/formik/FormikRadioGroup";
import { FormikCheckboxGroup } from "../../components/helpers/formik/FormikCheckboxGroup";
import { Map } from "immutable";
import {
    useLazyQueryWithError,
    useQueryWithError,
} from "../../hooks/useApolloHooksWithError";
import {
    useGetAllSessionsLazyQuery,
    useMyCoursesQuery,
} from "../../generated/graphql";
import setDay from "date-fns/setDay";
import { addWeeks } from "date-fns";
import setHours from "date-fns/setHours";
import { download } from "../../utils/download";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    chosenTermId: string;
};

export const TimetableExportModalContainer: FC<Props> = ({
    isOpen,
    onClose,
    chosenTermId,
}) => {
    const { data } = useQueryWithError(useMyCoursesQuery, {
        fetchPolicy: "cache-and-network",
    });
    const [courses, setCourses] = useState(Map<string, string>());
    const [
        getAllSessions,
        { data: getAllSessionsData, loading: getAllSessionsLoading },
    ] = useLazyQueryWithError(useGetAllSessionsLazyQuery, {});
    useEffect(() => {
        if (!data?.me?.courseStaffs || data.me.courseStaffs.length === 0) {
            return;
        }
        setCourses((prev) => prev.clear());
        for (const courseStaff of data.me.courseStaffs) {
            const { id, code } = courseStaff.timetable.course;
            if (courseStaff.timetable.term.id === chosenTermId) {
                setCourses((prev) => prev.set(id, code));
            }
        }
    }, [data, chosenTermId]);
    useEffect(() => {
        if (!getAllSessionsData) {
            return;
        }
        const calendar = ical({ name: "Tutor Timetable" });
        console.log(
            getAllSessionsData.allMergedSessions.filter(
                (session) => session.sessionStream.name === "P03 Flexible"
            )
        );
        getAllSessionsData.allMergedSessions.forEach((session) => {
            const { startTime, endTime } = session.sessionStream;
            const sessionDate = setDay(
                addWeeks(
                    session.sessionStream.timetable.term.startDate,
                    session.week
                ),
                session.sessionStream.day
            );
            const sessionStartTime = setHours(
                sessionDate,
                Math.floor(startTime)
            );
            const startMinutes = Math.round((startTime % 1) * 60);
            sessionStartTime.setMinutes(startMinutes, 0);
            const sessionEndTime = setHours(sessionDate, Math.floor(endTime));
            const endMinutes = Math.round((endTime % 1) * 60);
            sessionEndTime.setMinutes(endMinutes, 0);
            calendar.createEvent({
                summary: `${session.sessionStream.timetable.course.code} ${session.sessionStream.name}`,
                location: session.location,
                description: `Allocated Staff: ${
                    session.allocatedUsers
                        .map((user) => user.name)
                        .join(", ") || "None"
                }`,
                start: sessionStartTime,
                end: sessionEndTime,
                timezone: "Australia/Brisbane",
            });
        });
        download("tutor-timetable.ics", calendar.toString());
    }, [getAllSessionsData]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <Formik
                    initialValues={{
                        courses: Array.from(courses.keys()),
                        displayMode: TimetableDisplayMode.ME,
                    }}
                    onSubmit={async (values) => {
                        await getAllSessions({
                            variables: {
                                courseIds: values.courses,
                                mineOnly:
                                    values.displayMode ===
                                    TimetableDisplayMode.ME,
                                termId: chosenTermId,
                            },
                        });
                        onClose();
                    }}
                >
                    <Form>
                        <ModalHeader>Export Timetable</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormikCheckboxGroup
                                    values={Array.from(courses.keys())}
                                    name="courses"
                                    transformValue={(value) =>
                                        courses.get(value)!
                                    }
                                />
                                <FormikRadioGroup
                                    name="displayMode"
                                    values={[
                                        TimetableDisplayMode.ME,
                                        TimetableDisplayMode.ALL,
                                    ]}
                                    transformValue={(value) =>
                                        value === TimetableDisplayMode.ME
                                            ? "Download sessions allocated to me only"
                                            : "Download all sessions"
                                    }
                                    stackDirection="column"
                                />
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                isLoading={getAllSessionsLoading}
                                colorScheme="blue"
                                ml={3}
                                type="submit"
                            >
                                Download
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
};
