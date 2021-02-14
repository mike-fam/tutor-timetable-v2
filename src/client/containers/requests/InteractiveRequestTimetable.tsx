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
    chosenCourseIds: number[];
    chosenTermId: number;
    chosenWeek: number;
    chosenSessions: number[];
    chooseSession: (sessionId: number) => void;
    chooseWeek: Dispatch<SetStateAction<number>>;
    disabledWeeks: number[];
    sessionFilter: (sessions: SessionResponseType) => boolean;
    checkSessionDisabled: (session: SessionResponseType) => boolean;
    getSessionTheme: (session: SessionResponseType) => SessionTheme;
    parent: string;
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
    parent,
}) => {
    const { data: termsData } = useQueryWithError(useTermsQuery);
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
