import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { RequestTimetableContainer } from "./RequestTimetableContainer";
import { SessionTheme } from "../../types/timetable";
import { useTermsQuery } from "../../generated/graphql";
import { WeekNav } from "../../components/WeekNav";
import { Loadable } from "../../components/helpers/Loadable";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { SessionResponseType } from "../../types/session";
import { SessionsContext } from "../../hooks/useSessionUtils";
import { useTermMetadata } from "../../hooks/useTermMetadata";

type Props = {
    chosenCourseId: number;
    chosenTermId: number;
    chosenWeek: number;
    chosenSessions: number[];
    chooseSession: (sessionId: number) => void;
    chooseWeek: Dispatch<SetStateAction<number>>;
    disabledWeeks: number[];
    filterSessions: (
        sessions: Array<SessionResponseType>
    ) => Array<SessionResponseType>;
    checkSessionDisabled: (session: SessionResponseType) => boolean;
    getSessionTheme: (session: SessionResponseType) => SessionTheme;
};

export const InteractiveRequestTimetable: React.FC<Props> = ({
    chosenCourseId,
    chosenTermId,
    chooseSession,
    disabledWeeks,
    filterSessions,
    checkSessionDisabled,
    getSessionTheme,
    chosenWeek,
    chooseWeek,
}) => {
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const { sessionsData, fetchSessions } = useContext(SessionsContext);
    useEffect(() => {
        fetchSessions(chosenTermId, chosenCourseId, chosenWeek);
    }, [fetchSessions, chosenTermId, chosenCourseId, chosenWeek]);
    const { weekNum, chosenTerm } = useTermMetadata(chosenTermId);
    return (
        <Loadable isLoading={!termsData || !sessionsData}>
            <>
                <RequestTimetableContainer
                    chosenCourses={[chosenCourseId]}
                    chosenTerm={chosenTermId}
                    chosenWeek={chosenWeek}
                    checkDisabled={checkSessionDisabled}
                    getSessionTheme={getSessionTheme}
                    filterSessions={filterSessions}
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
