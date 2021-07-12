import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Set } from "immutable";
import { defaultInt } from "../../constants";
import { UserContext } from "../../utils/user";
import { InteractiveRequestTimetable } from "./InteractiveRequestTimetable";
import {
    SessionAvailabilityStatus,
    SessionResponseType,
    SessionTheme,
} from "../../types/session";
import { getAvailabilityStatus } from "../../utils/session";
import range from "lodash/range";
import { useTermMetadata } from "../../hooks/useTermMetadata";
import { useQueryWithError } from "../../hooks/useApolloHooksWithError";
import { useMyAvailabilityQuery } from "../../generated/graphql";
import { SessionsContext } from "../../hooks/useSessionUtils";
import { Text } from "@chakra-ui/react";
import { RequestTimetableLegends } from "../../components/requests/RequestTimetableLegends";

type Props = {
    chosenCourseId: string;
    chosenTermId: string;
    chosenSession: string;
    preferences: Set<string>;
    addPreference: (sessionId: string) => void;
    removePreference: (sessionId: string) => void;
};

export const CreateRequestPreferenceTimetableContainer: React.FC<Props> = ({
    chosenCourseId,
    chosenTermId,
    chosenSession,
    preferences,
    addPreference,
    removePreference,
}) => {
    const [chosenWeek, chooseWeek] = useState(defaultInt);
    const { user } = useContext(UserContext);
    const { currentWeek, weekNum, chosenTerm } = useTermMetadata(chosenTermId);
    const { data: availabilityData } = useQueryWithError(
        useMyAvailabilityQuery,
        {}
    );
    const { sessions, fetchSessions } = useContext(SessionsContext);
    useEffect(() => {
        fetchSessions(chosenTermId, chosenCourseId, chosenWeek);
    }, [chosenTermId, chosenCourseId, chosenWeek, fetchSessions]);

    // Do not filter any sessions
    const sessionFilter = useCallback(
        (session: SessionResponseType) => session.week === chosenWeek,
        [chosenWeek]
        // (session: SessionResponseType) =>
        // !session.sessionAllocations
        //     .map((allocation) => allocation.user.username)
        //     .includes(user.username),
        // [user.username]
    );
    const chooseSession = useCallback(
        (sessionId: string) => {
            preferences.includes(sessionId)
                ? removePreference(sessionId)
                : addPreference(sessionId);
        },
        [preferences, removePreference, addPreference]
    );
    const disabledWeeks = useMemo(
        () => (currentWeek > 0 ? range(0, currentWeek) : []),
        [currentWeek]
    );
    // Disable my sessions
    const checkSessionDisabled = useCallback(
        (session: SessionResponseType) => {
            // return session.id === chosenSession;
            return session.allocatedUsers.some(
                (allocatedUser) => allocatedUser.username === user.username
            );
        },
        // [chosenSession]
        [user.username]
    );
    const getSessionTheme = useCallback(
        (session: SessionResponseType) => {
            if (session.id === chosenSession) {
                return SessionTheme.OTHER;
            }
            if (!preferences.includes(session.id)) {
                return SessionTheme.PRIMARY;
            }
            switch (
                getAvailabilityStatus(
                    session,
                    sessions,
                    user.username,
                    availabilityData?.myAvailability
                )
            ) {
                case SessionAvailabilityStatus.AVAILABLE:
                    return SessionTheme.SUCCESS;
                case SessionAvailabilityStatus.CLASHED:
                    return SessionTheme.ERROR;
                case SessionAvailabilityStatus.UNAVAILABLE:
                    return SessionTheme.WARNING;
                default:
                    return SessionTheme.PRIMARY;
            }
        },
        [preferences, availabilityData, sessions, user.username, chosenSession]
    );
    useEffect(() => {
        if (chosenWeek !== defaultInt) {
            return;
        }
        chooseWeek(Math.min(Math.max(0, currentWeek), weekNum));
    }, [currentWeek, weekNum, chosenWeek]);
    const chosenCourseIds = useMemo(() => [chosenCourseId], [chosenCourseId]);
    return (
        <>
            <InteractiveRequestTimetable
                chosenCourseIds={chosenCourseIds}
                chosenTermId={chosenTermId}
                chosenWeek={chosenWeek}
                chooseSession={chooseSession}
                chooseWeek={chooseWeek}
                disabledWeeks={disabledWeeks}
                sessionFilter={sessionFilter}
                checkSessionDisabled={checkSessionDisabled}
                getSessionTheme={getSessionTheme}
            />
            <Text>
                Session{preferences.size > 1 && "s"} chosen:{" "}
                {preferences
                    .toArray()
                    .map((sessionId) => {
                        const session = sessions.get(sessionId);
                        if (!session) {
                            return "";
                        }
                        return `${session.sessionStream.name} on ${
                            chosenTerm?.weekNames[session.week]
                        }`;
                    })
                    .join(", ")}
            </Text>
            <RequestTimetableLegends />
        </>
    );
};
