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
    const { currentWeek, weekNum } = useTermMetadata(chosenTermId);

    const filterSessions = useCallback(
        (sessions: Array<SessionResponseType>) => {
            return getSessionsOfUser(sessions, user.username);
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
            if (
                session.id === chosenSession ||
                preferences.includes(session.id)
            ) {
                return SessionTheme.SUCCESS;
            } else {
                return SessionTheme.PRIMARY;
            }
        },
        [chosenSession, preferences]
    );
    useEffect(() => {
        if (chosenWeek !== notSet) {
            return;
        }
        chooseWeek(Math.min(Math.max(0, currentWeek), weekNum));
    }, [currentWeek, weekNum, chosenWeek]);
    return (
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
    );
};
