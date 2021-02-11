import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Set } from "immutable";
import { notSet } from "../../constants";
import { UserContext } from "../../utils/user";
import { InteractiveRequestTimetable } from "./InteractiveRequestTimetable";
import { SessionResponseType } from "../../types/session";
import { getSessionsOfUser } from "../../utils/session";
import range from "lodash/range";
import { SessionTheme } from "../../types/timetable";
import { useTermMetadata } from "../../hooks/useTermMetadata";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { useMyAvailabilityQuery } from "../../generated/graphql";
import { isAvailable } from "../../utils/availability";
import { SessionsContext } from "../../hooks/useSessionUtils";
import { Text } from "@chakra-ui/react";

type Props = {
    chosenCourseId: number;
    chosenTermId: number;
    chosenSession: number;
    preferences: Set<number>;
    addPreference: (sessionId: number) => void;
    removePreference: (sessionId: number) => void;
};

export const CreateRequestPreferenceTimetableContainer: React.FC<Props> = ({
    chosenCourseId,
    chosenTermId,
    chosenSession,
    preferences,
    addPreference,
    removePreference,
}) => {
    const [chosenWeek, chooseWeek] = useState(notSet);
    const { user } = useContext(UserContext);
    const { currentWeek, weekNum, chosenTerm } = useTermMetadata(chosenTermId);
    const { data: availabilityData } = useQueryWithError(
        useMyAvailabilityQuery
    );
    const { sessions, fetchSessions } = useContext(SessionsContext);
    useEffect(() => {
        fetchSessions(chosenTermId, chosenCourseId, chosenWeek);
    }, [chosenTermId, chosenCourseId, chosenWeek, fetchSessions]);
    const filterSessions = useCallback(
        (sessions: Array<SessionResponseType>) => {
            return getSessionsOfUser(sessions, user.username, true);
        },
        [user.username]
    );
    const chooseSession = useCallback(
        (sessionId: number) => {
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
    const checkSessionDisabled = useCallback(
        (session: SessionResponseType) => {
            return session.id === chosenSession;
        },
        [chosenSession]
    );
    const getSessionTheme = useCallback(
        (session: SessionResponseType) => {
            if (!preferences.includes(session.id)) {
                return SessionTheme.PRIMARY;
            }
            const sessionsOfWeek = getSessionsOfUser(
                sessions
                    .filter(
                        (otherSession) =>
                            session.week === otherSession.week &&
                            session.sessionStream.day ===
                                otherSession.sessionStream.day &&
                            session.sessionStream.timetable.term.id ===
                                otherSession.sessionStream.timetable.term.id
                    )
                    .valueSeq()
                    .toArray(),
                user.username
            );
            for (const otherSession of sessionsOfWeek) {
                const { startTime, endTime } = session.sessionStream;
                const {
                    startTime: otherStart,
                    endTime: otherEnd,
                } = otherSession.sessionStream;
                if (startTime <= otherStart && otherStart < endTime) {
                    return SessionTheme.ERROR;
                } else if (otherStart <= startTime && startTime < otherEnd) {
                    return SessionTheme.ERROR;
                }
            }
            if (availabilityData) {
                if (isAvailable(availabilityData.myAvailability, session)) {
                    return SessionTheme.SUCCESS;
                } else {
                    return SessionTheme.WARNING;
                }
            } else {
                return SessionTheme.PRIMARY;
            }
        },
        [preferences, availabilityData, sessions, user.username]
    );
    useEffect(() => {
        if (chosenWeek !== notSet) {
            return;
        }
        chooseWeek(Math.min(Math.max(0, currentWeek), weekNum));
    }, [currentWeek, weekNum, chosenWeek]);
    return (
        <>
            <InteractiveRequestTimetable
                chosenCourseId={chosenCourseId}
                chosenTermId={chosenTermId}
                chosenWeek={chosenWeek}
                chosenSessions={preferences.toArray()}
                chooseSession={chooseSession}
                chooseWeek={chooseWeek}
                disabledWeeks={disabledWeeks}
                filterSessions={filterSessions}
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
            <Text color="red.500" fontWeight="bold">
                Red means that session clashes with your current timetable
            </Text>
            <Text color="yellow.500" fontWeight="bold">
                Yellow means that session doesn't clash with your timetable, but
                you are not available on that time
            </Text>
            <Text color="green.500" fontWeight="bold">
                Green means that session doesn't clash and you are available on
                that time
            </Text>
        </>
    );
};
