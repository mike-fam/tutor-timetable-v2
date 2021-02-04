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
import { notSet } from "../../constants";
import range from "lodash/range";
import { UserContext } from "../../utils/user";
import { SessionResponseType } from "../../types/session";
import { getSessionsOfUser, isSessionPast } from "../../utils/session";
import { InteractiveRequestTimetable } from "./InteractiveRequestTimetable";
import { useTermMetadata } from "../../hooks/useTermMetadata";

type Props = {
    chosenCourseId: number;
    chosenTermId: number;
    chosenSession: number;
    chooseSession: Dispatch<SetStateAction<number>>;
};

// TODO: display sessions that user can choose
//		warning on sessions that user is not available on

export const CreateRequestSessionTimetableContainer: React.FC<Props> = ({
    chosenCourseId,
    chosenTermId,
    chooseSession,
    chosenSession,
}) => {
    const [chosenWeek, chooseWeek] = useState(notSet);
    const { chosenTerm, weekNum, currentWeek } = useTermMetadata(chosenTermId);
    const { user } = useContext(UserContext);
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
            return isSessionPast(session, chosenTerm);
        },
        [chosenTerm]
    );
    const getSessionTheme = useCallback(
        (session: SessionResponseType) => {
            return session.id === chosenSession
                ? SessionTheme.SUCCESS
                : SessionTheme.PRIMARY;
        },
        [chosenSession]
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
