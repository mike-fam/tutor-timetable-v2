import { Grid, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RequestFormState } from "../../hooks/useRequestFormState";
import { useLazyQueryWithError } from "../../hooks/useQueryWithError";
import { useCourseLazyQuery } from "../../generated/graphql";
import { capitalCase } from "change-case";
import { useSessionMap } from "../../hooks/useSessionMap";
import { notSet } from "../../constants";

type Props = Pick<
    RequestFormState,
    "title" | "course" | "description" | "session" | "duration" | "preferences"
> & {
    termId: number;
};

export const RequestReviewContainer: React.FC<Props> = ({
    title,
    course,
    description,
    duration,
    session,
    preferences,
    termId,
}) => {
    const [fetchCourse, { data: courseData }] = useLazyQueryWithError(
        useCourseLazyQuery
    );
    const { sessions, fetchSessions } = useSessionMap(termId, course);
    useEffect(() => {
        if (course === notSet) {
            return;
        }
        fetchCourse({
            variables: {
                courseId: course,
            },
        });
    }, [course, fetchCourse]);

    return (
        <Grid templateColumns="1fr 4fr">
            <Text fontWeight="bold">Title:</Text>
            <Text>{title}</Text>
            <Text fontWeight="bold">Description:</Text>
            <Text>{description}</Text>
            <Text fontWeight="bold">Course:</Text>
            <Text>{courseData?.course.code}</Text>
            <Text fontWeight="bold">Type:</Text>
            <Text>{capitalCase(duration)}</Text>
            <Text fontWeight="bold">Session:</Text>
            <Text fontWeight="bold">
                {sessions.get(session)?.sessionStream.name} on{" "}
                {sessions.get(session)?.week}
            </Text>
            <Text fontWeight="bold">Swap Preferences</Text>
            <UnorderedList>
                {preferences.map((sessionId) => (
                    <ListItem>
                        {sessions.get(sessionId)?.sessionStream.name} on{" "}
                        {sessions.get(sessionId)?.week}
                    </ListItem>
                ))}
            </UnorderedList>
        </Grid>
    );
};
