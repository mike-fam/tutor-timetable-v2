import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from "react";
import { RequestTimetableContainer } from "./RequestTimetableContainer";
import { SessionTheme } from "../../types/timetable";
import {
    useGetSessionsLazyQuery,
    useTermsQuery,
} from "../../generated/graphql";
import { WeekNav } from "../../components/WeekNav";
import { notSet } from "../../constants";
import { Loadable } from "../../components/helpers/Loadable";
import {
    useLazyQueryWithError,
    useQueryWithError,
} from "../../hooks/useQueryWithError";
import { Text } from "@chakra-ui/react";
import { getWeeksNum } from "../../utils/term";
import { SessionResponseType } from "../../types/session";
import { Map } from "immutable";

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

export const InteractiveRequestTimetableContainer: React.FC<Props> = ({
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
    const [sessions, setSessions] = useState<Map<number, SessionResponseType>>(
        Map()
    );
    const [getSessions, { data: sessionsData }] = useLazyQueryWithError(
        useGetSessionsLazyQuery
    );
    useEffect(() => {
        if ([chosenCourse, chosenTerm, chosenWeek].includes(notSet)) {
            return;
        }
        getSessions({
            variables: {
                courseIds: [chosenCourse],
                termId: chosenTerm,
                week: chosenWeek,
            },
        });
    }, [chosenCourse, chosenTerm, chosenWeek, getSessions]);
    const term = useMemo(
        () => termsData?.terms.filter((term) => term.id === chosenTerm)[0],
        [termsData, chosenTerm]
    );
    const weeksNum = useMemo(() => getWeeksNum(term), [term]);
    useEffect(() => {
        if (!sessionsData) {
            return;
        }
        sessionsData.sessions.forEach((session) => {
            setSessions((prev) => prev.set(session.id, session));
        });
    }, [sessionsData]);
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
