import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { RequestContext } from "../../hooks/useRequestUtils";
import { InteractiveRequestTimetable } from "./InteractiveRequestTimetable";
import { notSet } from "../../constants";
import { useTermMetadata } from "../../hooks/useTermMetadata";
import range from "lodash/range";
import { SessionResponseType, SessionTheme } from "../../types/session";

type Props = {
    requestId: number;
};

export const ViewRequestTimetableContainer: React.FC<Props> = ({
    requestId,
}) => {
    const { requests, fetchRequestById } = useContext(RequestContext);
    const request = useMemo(() => requests.get(requestId), [
        requests,
        requestId,
    ]);
    const { weekNum } = useTermMetadata(
        request?.session.sessionStream.timetable.term.id
    );
    useEffect(() => {
        if (!request) {
            fetchRequestById(requestId);
        }
    }, [requestId, request, fetchRequestById]);
    const chosenCourseIds = useMemo(
        () => [request?.session.sessionStream.timetable.course.id || notSet],
        [request]
    );
    const chosenTermId = useMemo(
        () => request?.session.sessionStream.timetable.term.id || notSet,
        [request]
    );
    const [chosenWeek, chooseWeek] = useState(notSet);
    const disabledWeeks = useMemo(() => {
        const everyWeek = range(0, weekNum);
        if (!request) {
            return everyWeek;
        }
        return everyWeek.filter(
            (week) =>
                week !== request.session.week &&
                request.swapPreference.every((session) => session.week !== week)
        );
    }, [request, weekNum]);
    const sessionFilter = useCallback(
        (session: SessionResponseType) => {
            if (!request) {
                return false;
            }
            if (session.week !== chosenWeek) {
                return false;
            }
            if (session.id === request.session.id) {
                return true;
            }
            if (
                request.swapPreference.some(
                    (sessionPref) => sessionPref.id === session.id
                )
            ) {
                return true;
            }
            return false;
        },
        [request, chosenWeek]
    );
    const getSessionTheme = useCallback(
        (session: SessionResponseType) => {
            if (!request) {
                return SessionTheme.PRIMARY;
            }
            if (session.id === request.session.id) {
                return SessionTheme.SUCCESS;
            }
            if (
                request.swapPreference.some(
                    (sessionPref) => sessionPref.id === session.id
                )
            ) {
                return SessionTheme.OTHER;
            }
            return SessionTheme.PRIMARY;
        },
        [request]
    );
    useEffect(() => {
        if (!request) {
            return;
        }
        chooseWeek(request.session.week);
    }, [request]);
    return (
        <InteractiveRequestTimetable
            chosenCourseIds={chosenCourseIds}
            chosenTermId={chosenTermId}
            chosenWeek={chosenWeek}
            chooseSession={() => {}}
            chooseWeek={chooseWeek}
            disabledWeeks={disabledWeeks}
            sessionFilter={sessionFilter}
            checkSessionDisabled={() => true}
            getSessionTheme={getSessionTheme}
        />
    );
};
