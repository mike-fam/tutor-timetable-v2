import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { RequestTimetableContainer } from "./RequestTimetableContainer";
import { useTermsQuery } from "../../generated/graphql";
import { WeekNav } from "../../components/WeekNav";
import { Loadable } from "../../components/helpers/Loadable";
import { useQueryWithError } from "../../hooks/useApolloHooksWithError";
import { SessionResponseType, SessionTheme } from "../../types/session";
import { SessionsContext } from "../../hooks/useSessionUtils";
import { useTermMetadata } from "../../hooks/useTermMetadata";

type Props = {
    chosenCourseIds: string[];
    chosenTermId: string;
    chosenWeek: number;
    chooseSession: (sessionId: string) => void;
    chooseWeek: Dispatch<SetStateAction<number>>;
    disabledWeeks: number[];
    sessionFilter: (sessions: SessionResponseType) => boolean;
    checkSessionDisabled: (session: SessionResponseType) => boolean;
    getSessionTheme: (session: SessionResponseType) => SessionTheme;
};

export const InteractiveRequestTimetable: React.FC<Props> = ({
    chosenCourseIds,
    chosenTermId,
    chooseSession,
    disabledWeeks,
    sessionFilter,
    checkSessionDisabled,
    getSessionTheme,
    chosenWeek,
    chooseWeek,
}) => {
    const { data: termsData } = useQueryWithError(useTermsQuery, {});
    const { sessionsData, fetchSessions } = useContext(SessionsContext);
    useEffect(() => {
        for (const courseId of chosenCourseIds) {
            fetchSessions(chosenTermId, courseId, chosenWeek);
        }
    }, [fetchSessions, chosenTermId, chosenCourseIds, chosenWeek]);
    const { weekNum, chosenTerm } = useTermMetadata(chosenTermId);
    return (
        <Loadable isLoading={!termsData || !sessionsData}>
            <>
                <RequestTimetableContainer
                    chosenCourses={chosenCourseIds}
                    chosenTerm={chosenTermId}
                    chosenWeek={chosenWeek}
                    checkDisabled={checkSessionDisabled}
                    getSessionTheme={getSessionTheme}
                    sessionFilter={sessionFilter}
                    chooseSession={chooseSession}
                />
                <WeekNav
                    showAllWeeks={false}
                    weekNames={chosenTerm?.weekNames || []}
                    weeksNum={weekNum}
                    chosenWeek={chosenWeek}
                    chooseWeek={chooseWeek}
                    disabled={disabledWeeks}
                    tabSize="sm"
                />
            </>
        </Loadable>
    );
};
