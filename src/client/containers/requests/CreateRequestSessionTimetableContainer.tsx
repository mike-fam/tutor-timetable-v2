import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { SessionTheme } from "../../types/timetable";
import { useTermsQuery } from "../../generated/graphql";
import { notSet } from "../../constants";
import range from "lodash/range";
import { UserContext } from "../../utils/user";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { getCurrentWeek, getWeeksNum } from "../../utils/term";
import { SessionResponseType } from "../../types/session";
import { getSessionsOfUser, isSessionPast } from "../../utils/session";
import { InteractiveRequestTimetable } from "./InteractiveRequestTimetable";

type Props = {
    chosenCourse: number;
    chosenTerm: number;
    chosenSession: number;
    chooseSession: Dispatch<SetStateAction<number>>;
};

// TODO: display sessions that user can choose
//		warning on sessions that user is not available on

export const CreateRequestSessionTimetableContainer: React.FC<Props> = ({
    chosenCourse,
    chosenTerm,
    chooseSession,
    chosenSession,
}) => {
    const [chosenWeek, chooseWeek] = useState(notSet);
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const { user } = useContext(UserContext);
    const term = useMemo(
        () => termsData?.terms.filter((term) => term.id === chosenTerm)[0],
        [termsData, chosenTerm]
    );
    const currentWeek = useMemo(() => getCurrentWeek(term), [term]);
    const disabledWeeks = useMemo(
        () => (currentWeek > 0 ? range(0, currentWeek) : []),
        [currentWeek]
    );
    const filterSessions = useCallback(
        (sessions: Array<SessionResponseType>) => {
            return getSessionsOfUser(sessions, user.username);
        },
        [user.username]
    );
    const checkSessionDisabled = useCallback(
        (session: SessionResponseType) => {
            return isSessionPast(session, term);
        },
        [term]
    );
    const getSessionTheme = useCallback(
        (session: SessionResponseType) => {
            return session.id === chosenSession
                ? SessionTheme.SUCCESS
                : SessionTheme.PRIMARY;
        },
        [chosenSession]
    );
    const weeksNum = useMemo(() => getWeeksNum(term), [term]);
    useEffect(() => {
        if (chosenWeek !== notSet) {
            return;
        }
        chooseWeek(Math.min(Math.max(0, currentWeek), weeksNum));
    }, [currentWeek, weeksNum, chosenWeek]);
    return (
        <InteractiveRequestTimetable
            chosenCourse={chosenCourse}
            chosenTerm={chosenTerm}
            chosenSessions={[chosenSession]}
            chooseSession={chooseSession}
            disabledWeeks={disabledWeeks}
            filterSessions={filterSessions}
            checkSessionDisabled={checkSessionDisabled}
            getSessionTheme={getSessionTheme}
            chosenWeek={chosenWeek}
            chooseWeek={chooseWeek}
        />
    );
};
