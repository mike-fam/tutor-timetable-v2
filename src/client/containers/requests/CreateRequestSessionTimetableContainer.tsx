import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { notSet } from "../../constants";
import range from "lodash/range";
import { UserContext } from "../../utils/user";
import { SessionResponseType, SessionTheme } from "../../types/session";
import { isSessionPast } from "../../utils/session";
import { InteractiveRequestTimetable } from "./InteractiveRequestTimetable";
import { useTermMetadata } from "../../hooks/useTermMetadata";

type Props = {
    chosenCourseId: number;
    chosenTermId: number;
    chosenSession: number;
    chooseSession: Dispatch<SetStateAction<number>>;
};

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

    // Show only my sessions
    const sessionFilter = useCallback(
        (session: SessionResponseType) => {
            if (session.week !== chosenWeek) {
                return false;
            }
            return session.sessionAllocations.some(
                (allocation) => allocation.user.username === user.username
            );
        },
        [chosenWeek, user.username]
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
    const chosenCourseIds = useMemo(() => [chosenCourseId], [chosenCourseId]);
    return (
        <InteractiveRequestTimetable
            chosenCourseIds={chosenCourseIds}
            chosenTermId={chosenTermId}
            chooseSession={chooseSession}
            disabledWeeks={disabledWeeks}
            sessionFilter={sessionFilter}
            checkSessionDisabled={checkSessionDisabled}
            getSessionTheme={getSessionTheme}
            chosenWeek={chosenWeek}
            chooseWeek={chooseWeek}
        />
    );
};
