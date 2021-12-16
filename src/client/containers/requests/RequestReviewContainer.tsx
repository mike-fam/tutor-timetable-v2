import { Grid, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { FC, useContext, useEffect } from "react";
import { useLazyQueryWithError } from "../../hooks/useApolloHooksWithError";
import { useCourseLazyQuery } from "../../generated/graphql";
import { capitalCase } from "change-case";
import { SessionsContext } from "../../hooks/useSessionUtils";
import { defaultStr } from "../../constants";
import { useTermMetadata } from "../../hooks/useTermMetadata";
import { RequestFormState } from "../../types/requests";

type Props = Pick<
    RequestFormState,
    "title" | "course" | "description" | "session" | "type" | "preferences"
> & {
    termId: string;
};

export const RequestReviewContainer: FC<Props> = ({
    title,
    course,
    description,
    type,
    session,
    preferences,
    termId,
}) => {
    const [fetchCourse, { data: courseData }] = useLazyQueryWithError(
        useCourseLazyQuery,
        {}
    );
    const { chosenTerm } = useTermMetadata(termId);
    const { sessions, fetchSessionById } = useContext(SessionsContext);
    useEffect(() => {
        if (course === defaultStr) {
            return;
        }
        fetchCourse({
            variables: {
                courseId: course,
            },
        });
    }, [course, fetchCourse]);
    useEffect(() => {
        if (sessions.has(session)) {
            return;
        }
        fetchSessionById(session);
    }, [session, fetchSessionById, sessions]);
    useEffect(() => {
        preferences.forEach((sessionId) => {
            if (sessions.has(session)) {
                return;
            }
            fetchSessionById(sessionId);
        });
    }, [preferences, fetchSessionById, sessions, session]);

    return (
        <Grid templateColumns="1fr 3fr" w="80%" mx="auto">
            <Text fontWeight="bold">Title:</Text>
            <Text>{title}</Text>
            <Text fontWeight="bold">Description:</Text>
            <Text>{description}</Text>
            <Text fontWeight="bold">Course:</Text>
            <Text>{courseData?.course.code}</Text>
            <Text fontWeight="bold">Type:</Text>
            <Text>{capitalCase(type)}</Text>
            <Text fontWeight="bold">Session:</Text>
            <Text fontWeight="bold">
                {sessions.get(session)?.sessionStream.name} on{" "}
                {chosenTerm?.weekNames[sessions.get(session)?.week || 0]}
            </Text>
            <Text fontWeight="bold">Swap Preferences:</Text>
            <UnorderedList>
                {preferences.map((sessionId) => (
                    <ListItem key={sessionId}>
                        {sessions.get(sessionId)?.sessionStream.name} on{" "}
                        {
                            chosenTerm?.weekNames[
                                sessions.get(sessionId)?.week || 0
                            ]
                        }
                    </ListItem>
                ))}
            </UnorderedList>
        </Grid>
    );
};
