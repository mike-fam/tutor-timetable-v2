import React, { useCallback, useContext, useMemo, useState } from "react";
import { Set } from "immutable";
import { notSet } from "../../constants";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { useTermsQuery } from "../../generated/graphql";
import { UserContext } from "../../utils/user";
import { InteractiveRequestTimetable } from "./InteractiveRequestTimetable";
import { SessionResponseType } from "../../types/session";
import { getSessionsOfUser } from "../../utils/session";
import { getCurrentWeek } from "../../utils/term";
import range from "lodash/range";
import { SessionTheme } from "../../types/timetable";

type Props = {
    chosenCourse: number;
    chosenTerm: number;
    chosenSession: number;
    preferences: Set<number>;
    addPreference: (sessionId: number) => void;
    removePreference: (sessionId: number) => void;
};

export const CreateRequestPreferenceTimetableContainer: React.FC<Props> = ({
    chosenCourse,
    chosenTerm,
    chosenSession,
    preferences,
    addPreference,
    removePreference,
}) => {
    const [chosenWeek, chooseWeek] = useState(notSet);
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const { user } = useContext(UserContext);

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
    const term = useMemo(
        () => termsData?.terms.filter((term) => term.id === chosenTerm)[0],
        [termsData, chosenTerm]
    );
    const currentWeek = useMemo(() => getCurrentWeek(term), [term]);
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
    const getSessionTheme = useCallback((session: SessionResponseType) => {
        if (session.id === chosenSession || preferences.includes(session.id)) {
            return SessionTheme.SUCCESS;
        } else {
            return SessionTheme.PRIMARY;
        }
    }, [chosenSession, preferences]);
    return (
        <InteractiveRequestTimetable
            chosenCourse={chosenCourse}
            chosenTerm={chosenTerm}
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
