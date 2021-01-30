import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    RequestTimetableContainer,
    SessionResponseType,
} from "./RequestTimetableContainer";
import { SessionTheme } from "../../types/timetable";
import {
    GetSessionsQuery,
    useMyAvailabilityQuery,
    useTermsQuery,
} from "../../generated/graphql";
import { WeekNav } from "../../components/WeekNav";
import { notSet } from "../../constants";
import differenceInWeeks from "date-fns/differenceInWeeks";
import parseISO from "date-fns/parseISO";
import getISODay from "date-fns/getISODay";
import range from "lodash/range";
import { Loadable } from "../../components/helpers/Loadable";
import { UserContext } from "../../utils/user";
import { useQueryWithError } from "../../hooks/useQueryWithError";

type Props = {
    chosenCourse: number;
    chosenTerm: number;
    chosenSession: number;
    chooseSession: Dispatch<SetStateAction<number>>;
};

// TODO: display sessions that user can choose
//		warning on sessions that user is not available on

export const SessionRequestTimetableContainer: React.FC<Props> = ({
    chosenCourse,
    chosenTerm,
    chooseSession,
    chosenSession,
}) => {
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const { user } = useContext(UserContext);
    const [chosenWeek, chooseWeek] = useState(notSet);
    const term = useMemo(
        () => termsData?.terms.filter((term) => term.id === chosenTerm)[0],
        [termsData, chosenTerm]
    );
    const { data: availabilityData } = useQueryWithError(
        useMyAvailabilityQuery
    );
    const weeksNum = useMemo(() => {
        if (!term) {
            return 0;
        }
        return differenceInWeeks(
            parseISO(term.endDate),
            parseISO(term.startDate)
        );
    }, [term]);
    const currentWeek = useMemo(() => {
        if (!term) {
            return 0;
        }
        return differenceInWeeks(
            new Date(2021, 2, 1),
            parseISO(term.startDate)
        );
    }, [term]);
    useEffect(() => {
        if (!term) {
            return;
        }
        chooseWeek(
            Math.min(
                Math.max(0, currentWeek),
                differenceInWeeks(
                    parseISO(term.endDate),
                    parseISO(term.startDate)
                )
            )
        );
    }, [currentWeek, term]);
    const disabledWeeks = useMemo(
        () => (currentWeek > 0 ? range(0, currentWeek) : []),
        [currentWeek]
    );
    const filterSessions = useCallback(
        (sessions: GetSessionsQuery["sessions"]) => {
            return sessions.filter((session) =>
                session.sessionAllocations
                    .map((allocation) => allocation.user.username)
                    .includes(user.username)
            );
        },
        [user.username]
    );
    const checkDisabled = useCallback(
        (session: SessionResponseType) => {
            if (!term) {
                return true;
            }
            if (session.week < currentWeek) {
                return true;
            } else {
                return (
                    session.week === currentWeek &&
                    session.sessionStream.day < getISODay(new Date())
                );
            }
        },
        [term, currentWeek]
    );
    const getSessionTheme = useCallback(
        (session: SessionResponseType) => {
            return session.id === chosenSession
                ? SessionTheme.SUCCESS
                : SessionTheme.PRIMARY;
        },
        [chosenSession]
    );
    return (
        <Loadable isLoading={!termsData}>
            <>
                <RequestTimetableContainer
                    chosenCourse={chosenCourse}
                    chosenTerm={chosenTerm}
                    chosenWeek={chosenWeek}
                    checkDisabled={checkDisabled}
                    getTheme={getSessionTheme}
                    filterSessions={filterSessions}
                    chooseSession={(sessionId) => {
                        console.log("Click click", sessionId);
                        chooseSession(sessionId);
                    }}
                />
                <WeekNav
                    showAllWeeks={false}
                    weekNames={term?.weekNames || []}
                    weeksNum={weeksNum}
                    chosenWeek={chosenWeek}
                    chooseWeek={chooseWeek}
                    disabled={disabledWeeks}
                />
            </>
        </Loadable>
    );
};
