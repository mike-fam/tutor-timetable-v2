import { Grid, Text } from "@chakra-ui/react";
import React from "react";
import { RequestFormState } from "../../hooks/useRequestFormState";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { useCourseQuery } from "../../generated/graphql";
import { capitalCase } from "change-case";

type Props = Pick<
    RequestFormState,
    "title" | "course" | "description" | "session" | "duration" | "preferences"
>;

export const RequestReviewContainer: React.FC<Props> = ({
    title,
    course,
    description,
    duration,
    session,
    preferences,
}) => {
    const { data: courseData } = useQueryWithError(useCourseQuery, {
        courseId: course,
    });

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
            <Text fontWeight="bold">Swap Preferences:</Text>
        </Grid>
    );
};
