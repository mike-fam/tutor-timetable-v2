import { Box, Grid, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import {
    FC,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { OfferDayTimetablePreview } from "./OfferDayTimetablePreview";
import { RequestContext } from "../../hooks/useRequestUtils";
import { defaultInt, defaultStr } from "../../constants";
import { RequestType } from "../../generated/graphql";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { SessionsContext } from "../../hooks/useSessionUtils";
import { useTermMetadata } from "../../hooks/useTermMetadata";

type Props = {
    requestId: string;
};

export const ViewRequestContainer: FC<Props> = ({ requestId }) => {
    const { requests, fetchRequestById } = useContext(RequestContext);
    const [sessionId, setSessionId] = useState(defaultStr);
    const [week, setWeek] = useState(defaultInt);
    const { sessions, fetchSessions } = useContext(SessionsContext);
    useEffect(() => {
        if (!requests.get(requestId)) {
            fetchRequestById(requestId);
        }
    });
    const request = useMemo(
        () => requests.get(requestId),
        [requestId, requests]
    );
    const { chosenTerm } = useTermMetadata(
        request?.session.sessionStream.timetable.term.id
    );
    useEffect(() => {
        if (!request) {
            return;
        }
        if (week === defaultInt) {
            setWeek(request.session.week);
        }
        // Temporary request
        if (
            request.type === RequestType.Temporary ||
            sessionId === defaultStr
        ) {
            setSessionId(request.session.id);
            return;
        }
        // Permanent request
        // Show request of same session but in given week
        const sessionStreamId = request.session.sessionStream.id;
        const filteredSessions = sessions.filter(
            (session) =>
                session.sessionStream.id === sessionStreamId &&
                session.week === week
        );
        if (filteredSessions.size === 0) {
            const timetable = request.session.sessionStream.timetable;
            fetchSessions(timetable.term.id, [timetable.course.id], week);
            return;
        }
        setSessionId(filteredSessions.valueSeq().toArray()[0].id);
    }, [request, week, sessions, fetchSessions, sessionId]);
    const goToWeek = useCallback(
        (next: boolean) => {
            if (!request) {
                return;
            }
            const availWeeks = request.session.sessionStream.weeks;
            const streamWeekIndex = availWeeks.indexOf(week);
            setWeek(
                availWeeks[next ? streamWeekIndex + 1 : streamWeekIndex - 1]
            );
        },
        [request, week]
    );
    return (
        <Grid templateColumns="1fr 1fr">
            <Stack gridRow={2} gridColumn={1}>
                <Text fontSize="lg">
                    <strong>Title</strong>: {request?.title}
                </Text>
                <Text fontSize="lg">
                    <strong>Description</strong>: {request?.description}
                </Text>
                <Text fontSize="lg">
                    <strong>Type</strong>: {request?.type}
                </Text>
                <Text fontSize="lg">
                    <strong>Session</strong>:{" "}
                    {request?.session.sessionStream.name} on{" "}
                    {
                        request?.session.sessionStream.timetable.term.weekNames[
                            request?.session.week
                        ]
                    }
                </Text>
            </Stack>
            <Text gridRow={1} gridColumn={2} fontSize="xl">
                On that day:
            </Text>
            <Stack gridRow={2} gridColumn={2} spacing={2}>
                <HStack spacing={2}>
                    {request?.type === RequestType.Permanent && (
                        <IconButton
                            aria-label="Prev week"
                            icon={<BsChevronLeft />}
                            isDisabled={week <= request.session.week}
                            onClick={() => {
                                goToWeek(false);
                            }}
                            isRound
                        />
                    )}
                    {request?.session && (
                        <Box w="90%">
                            <OfferDayTimetablePreview sessionId={sessionId} />
                        </Box>
                    )}
                    {request?.type === RequestType.Permanent && (
                        <IconButton
                            aria-label="Prev week"
                            icon={<BsChevronRight />}
                            isDisabled={
                                week >=
                                Math.max(...request.session.sessionStream.weeks)
                            }
                            onClick={() => {
                                goToWeek(true);
                            }}
                            isRound
                        />
                    )}
                </HStack>
                {chosenTerm && week !== defaultInt && (
                    <Box alignSelf="center">{chosenTerm.weekNames[week]}</Box>
                )}
            </Stack>
        </Grid>
    );
};
