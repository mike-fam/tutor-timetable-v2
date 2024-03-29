import { FC, useContext, useEffect, useState } from "react";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { Map } from "immutable";
import {
    RequestSession,
    RequestSessionProps,
} from "../../components/requests/RequestSession";
import { TimetableSessionType } from "../../types/timetable";
import { requestTimeslotHeight } from "../../constants/requests";
import { IsoDay } from "../../../types/date";
import { SessionsContext } from "../../hooks/useSessionUtils";
import { SessionResponseType, SessionTheme } from "../../types/session";

type Props = {
    chosenCourses: string[];
    chosenTerm: string;
    chosenWeek: number;
    checkDisabled: (session: SessionResponseType) => boolean;
    getSessionTheme: (session: SessionResponseType) => SessionTheme;
    chooseSession: (sessionId: string) => void;
    sessionFilter?: (sessions: SessionResponseType) => boolean;
    displayedDays?: IsoDay[];
};

export const RequestTimetableContainer: FC<Props> = ({
    chosenTerm,
    chosenCourses,
    chosenWeek,
    checkDisabled,
    getSessionTheme,
    chooseSession,
    sessionFilter = (sessions) => sessions,
    displayedDays: displayedDayProps,
}) => {
    const {
        displayedDays: displayedDaysContext,
        dayStartTime,
        dayEndTime,
    } = useContext(TimetableSettingsContext);
    const displayedDays = displayedDayProps
        ? displayedDayProps
        : displayedDaysContext;
    const [sessionInfo, setSessionInfo] = useState<
        Map<string, RequestSessionProps>
    >(Map<string, RequestSessionProps>());
    const { fetchSessions, sessions: sessionMap } = useContext(SessionsContext);
    const [timetableSessions, setTimetableSessions] = useState<
        TimetableSessionType[]
    >([]);

    useEffect(() => {
        for (const courseId of chosenCourses) {
            fetchSessions(chosenTerm, [courseId], chosenWeek);
        }
    }, [chosenTerm, chosenCourses, chosenWeek, fetchSessions]);
    useEffect(() => {
        const sessions = sessionMap.filter(sessionFilter).valueSeq().toArray();
        sessions.forEach((session) => {
            setSessionInfo((prev) =>
                prev.set(session.id, {
                    onClick: chooseSession,
                    disabled: checkDisabled(session),
                    theme: getSessionTheme(session),
                    location: session.location,
                    allocation: session.allocatedUsers.map((user) => user.name),
                })
            );
        });
        setTimetableSessions(
            sessions.map((session) => ({
                id: session.id,
                name: session.sessionStream.name,
                startTime: session.sessionStream.startTime,
                endTime: session.sessionStream.endTime,
                day: session.sessionStream.day,
            }))
        );
    }, [
        sessionMap,
        checkDisabled,
        getSessionTheme,
        sessionFilter,
        chooseSession,
    ]);
    return (
        <Timetable
            displayedDays={displayedDays}
            sessions={timetableSessions}
            startTime={dayStartTime}
            endTime={dayEndTime}
            timeslotHeight={requestTimeslotHeight}
            renderDay={(dayProps, key) => (
                <Day
                    {...dayProps}
                    renderSession={(sessionProps, key) => (
                        <RequestSession
                            {...sessionProps}
                            key={key}
                            custom={(sessionId) =>
                                sessionInfo.get(sessionId) || {
                                    onClick: chooseSession,
                                    disabled: true,
                                    theme: SessionTheme.PRIMARY,
                                    location: "",
                                    allocation: [],
                                }
                            }
                        />
                    )}
                    key={key}
                    renderTimeSlot={(key) => <TimeSlot key={key} />}
                />
            )}
        />
    );
};
