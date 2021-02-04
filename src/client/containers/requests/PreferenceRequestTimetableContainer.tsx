import React, { useCallback, useContext, useMemo, useState } from "react";
import { Set } from "immutable";
import { notSet } from "../../constants";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { useTermsQuery } from "../../generated/graphql";
import { UserContext } from "../../utils/user";

type Props = {
    chosenCourse: number;
    chosenTerm: number;
    chosenSession: number;
    preferences: Set<number>;
    addPreference: (sessionId: number) => void;
    removePreference: (sessionId: number) => void;
};

export const PreferenceRequestTimetableContainer: React.FC<Props> = ({
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
    const term = useMemo(
        () => termsData?.terms.filter((term) => term.id === chosenTerm)[0],
        [termsData, chosenTerm]
    );
    const chooseSession = useCallback(
        (sessionId: number) => {
            preferences.includes(sessionId)
                ? removePreference(sessionId)
                : addPreference(sessionId);
        },
        [preferences, removePreference, addPreference]
    );
    return (
        // <InteractiveRequestTimetable
        //     chosenCourse={chosenCourse}
        //     chosenTerm={chosenTerm}
        //     chosenWeek={chosenWeek}
        //     chosenSessions={preferences.toArray()}
        //     chooseSession={chooseSession}
        //     chooseWeek={chooseWeek}
        //     disabledWeeks={}
        //     filterSessions={}
        //     checkSessionDisabled={}
        //     getSessionTheme={}
        // />
        <div>test</div>
    );
};
