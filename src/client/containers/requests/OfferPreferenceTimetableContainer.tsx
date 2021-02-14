import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { InteractiveRequestTimetable } from "./InteractiveRequestTimetable";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { useMyCoursesQuery, useTermsQuery } from "../../generated/graphql";
import { notSet } from "../../constants";
import { getCurrentTerm } from "../../utils/term";
import { RequestContext } from "../../hooks/useRequestUtils";
import { SessionResponseType } from "../../types/session";
import { UserContext } from "../../utils/user";
import minBy from "lodash/minBy";
import { useTermMetadata } from "../../hooks/useTermMetadata";
import range from "lodash/range";
import parseISO from "date-fns/parseISO";
import { addDays, addWeeks, startOfISOWeek } from "date-fns";
import { IsoDay } from "../../../types/date";
import { SessionTheme } from "../../types/timetable";

type Props = {
    requestId: number;
    chosenSessions: number[];
    chooseSession: (sessionId: number) => void;
};

export const OfferPreferenceTimetableContainer: React.FC<Props> = ({
    requestId,
    chosenSessions,
    chooseSession,
}) => {
    const { requests, fetchRequestById } = useContext(RequestContext);
    const request = useMemo(() => requests.get(requestId), [
        requests,
        requestId,
    ]);
    const { currentWeek } = useTermMetadata(
        request?.session.sessionStream.timetable.term.id
    );
    const { data: myCoursesData } = useQueryWithError(useMyCoursesQuery);
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const [week, setWeek] = useState(notSet);
    const { user } = useContext(UserContext);
    const [defaultWeekIsSet, setDefaultWeekIsSet] = useState(false);
    const myCourseIds = useMemo(() => {
        if (!myCoursesData) {
            return [];
        }
        return myCoursesData.me.courseStaffs.map(
            (courseStaff) => courseStaff.timetable.course.id
        );
    }, [myCoursesData]);
    const [termId, setTermId] = useState(notSet);
    useEffect(() => {
        if (!termsData) {
            return;
        }
        setTermId(getCurrentTerm(termsData.terms).id);
    }, [termsData]);
    useEffect(() => {
        if (!request) {
            fetchRequestById(requestId);
        }
    }, [request, fetchRequestById, requestId]);

    // the preference on an offer must be a session the offerer is assigned to
    // and one of the request preferences
    const sessionFilter = useCallback(
        (session: SessionResponseType) => {
            if (!request) {
                return false;
            }
            // Display session that I'll take
            if (request?.session.id === session.id) {
                return true;
            }
            // Display requester's preferences
            if (
                request.swapPreference.some(
                    (preference) => preference.id === session.id
                )
            ) {
                return true;
            }
            // // Display my sessions
            // if (
            //     session.sessionAllocations.some(
            //         (allocation) => allocation.user.username === user.username
            //     )
            // ) {
            //     return true;
            // }
            return false;
        },
        [request, user.username]
    );

    const checkDisabled = useCallback(
        (session: SessionResponseType) => {
            if (!request) {
                return true;
            }
            const termStartDate = parseISO(
                request.session.sessionStream.timetable.term.startDate
            );
            if (session.id === request.session.id) {
                return true;
            }
            // disable everything if I'm already assigned to the requester's session
            if (
                request.session.sessionAllocations.some(
                    (allocation) => allocation.user.username === user.username
                )
            ) {
                return true;
            }
            // Disable non-selectable sessions, i.e not on preference list
            if (
                request.swapPreference.every(
                    (preference) => preference.id !== session.id
                )
            ) {
                return true;
            }
            // Disable sessions that I cannot give
            if (
                session.sessionAllocations.every(
                    (allocation) => allocation.user.username !== user.username
                )
            ) {
                return true;
            }
            // Disable sessions before today
            const today = new Date();
            const sessionDay = addDays(
                addWeeks(startOfISOWeek(termStartDate), session.week),
                session.sessionStream.day - IsoDay.MON
            );
            if (sessionDay < today) {
                return true;
            }
            return false;
        },
        [request, user.username]
    );

    // Disable weeks before current weeks
    const disabledWeeks = useMemo(
        () => (currentWeek > 0 ? range(0, currentWeek) : []),
        [currentWeek]
    );

    // session theme
    const getSessionTheme = useCallback(
        (session: SessionResponseType) => {
            if (!request) {
                return SessionTheme.PRIMARY;
            }

            // The session I will switch into is in success and is disabled.
            if (request.session.id === session.id) {
                return SessionTheme.SUCCESS;
            }

            // The sessions on the preferences are in teal.
            if (
                request.swapPreference.some(
                    (swapSession) => swapSession.id === session.id
                )
            ) {
                return SessionTheme.OTHER;
            }
            // My sessions that are not on the request preferences are disabled
            // and in primary
            return SessionTheme.PRIMARY;
        },
        [request]
    );

    // Set week to the earliest week of the preferences
    useEffect(() => {
        if (!request || defaultWeekIsSet) {
            return;
        }
        const sessions = [...request.swapPreference, request.session];
        setWeek(
            minBy(sessions, (session) => session.week)?.week || currentWeek
        );
        setDefaultWeekIsSet(true);
    }, [request, currentWeek, defaultWeekIsSet]);

    // week: select lowest week that has preference by default
    // filter sessions: filter out sessions not of me but leave the preferences.
    // disabled sessions: disable my sessions that are not on the preference.
    // theme based on clashing and avail.

    return (
        <InteractiveRequestTimetable
            chosenCourseIds={myCourseIds}
            chosenTermId={termId}
            chosenWeek={week}
            chosenSessions={chosenSessions}
            chooseSession={chooseSession}
            chooseWeek={setWeek}
            disabledWeeks={disabledWeeks}
            sessionFilter={sessionFilter}
            checkSessionDisabled={checkDisabled}
            getSessionTheme={getSessionTheme}
        />
    );
};
