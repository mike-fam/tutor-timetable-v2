import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { RequestTimetableContainer } from "./RequestTimetableContainer";
import { SessionTheme } from "../../types/timetable";
import { useTermsQuery } from "../../generated/graphql";
import { WeekNav } from "../../components/WeekNav";
import { Loadable } from "../../components/helpers/Loadable";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { Text } from "@chakra-ui/react";
import { getWeeksNum } from "../../utils/term";
import { SessionResponseType } from "../../types/session";
import { useSessionMap } from "../../hooks/useSessionMap";

type Props = {
    chosenCourse: number;
    chosenTerm: number;
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
    chosenCourse,
    chosenTerm,
    chooseSession,
    chosenSessions,
    disabledWeeks,
    filterSessions,
    checkSessionDisabled,
    getSessionTheme,
    chosenWeek,
    chooseWeek,
}) => {
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const { sessions, sessionsData, fetchSessions } = useSessionMap(
        chosenTerm,
        chosenCourse
    );
    useEffect(() => {
        fetchSessions(chosenWeek);
    }, [fetchSessions, chosenWeek]);
    const term = useMemo(
        () => termsData?.terms.filter((term) => term.id === chosenTerm)[0],
        [termsData, chosenTerm]
    );
    const weeksNum = useMemo(() => getWeeksNum(term), [term]);
    return (
        <Loadable isLoading={!termsData || !sessionsData}>
            <>
                <RequestTimetableContainer
                    chosenCourse={chosenCourse}
                    chosenTerm={chosenTerm}
                    chosenWeek={chosenWeek}
                    checkDisabled={checkSessionDisabled}
                    getSessionTheme={getSessionTheme}
                    filterSessions={filterSessions}
                    chooseSession={chooseSession}
                />
                <WeekNav
                    showAllWeeks={false}
                    weekNames={term?.weekNames || []}
                    weeksNum={weeksNum}
                    chosenWeek={chosenWeek}
                    chooseWeek={chooseWeek}
                    disabled={disabledWeeks}
                    tabSize="sm"
                />
                <Text>
                    Session{chosenSessions.length > 1 && "s"} chosen:{" "}
                    {chosenSessions
                        .map((sessionId) => {
                            const session = sessions.get(sessionId);
                            if (!session) {
                                return "";
                            }
                            return `${session.sessionStream.name} on ${
                                term?.weekNames[session.week]
                            }`;
                        })
                        .join(", ")}
                </Text>
            </>
        </Loadable>
    );
};
