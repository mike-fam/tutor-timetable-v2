import React, { useContext, useMemo } from "react";
import { Timetable } from "../components/timetable/Timetable";
import { Day } from "../components/timetable/Day";
import { TimeSlot } from "../components/timetable/TimeSlot";
import {
    Props as SessionProps,
} from "../components/timetable/Session";
import { TimetableContext, TimetableSettingsContext } from "../utils/timetable";
import { useQueryWithError } from "../hooks/useQueryWithError";
import {
    useGetSessionsQuery,
    useGetSessionStreamsQuery,
} from "../generated/graphql";
import { Loadable } from "../components/helpers/Loadable";
import { IsoDay } from "../../types/date";
import { TimetableSession } from "../components/TimetableSession";

type Props = {};

export const TimetableContainer: React.FC<Props> = () => {
    const { displayedDays, dayStartTime, dayEndTime } = useContext(
        TimetableSettingsContext
    );
    const { chosenTermId, chosenWeek, chosenCourses } = useContext(
        TimetableContext
    );
    const { data: sessionsData, loading: sessionsLoading } = useQueryWithError(
        useGetSessionsQuery,
        {
            termId: chosenTermId,
            courseIds: chosenCourses.toArray(),
            week: chosenWeek,
        }
    );
    const {
        data: sessionStreamsData,
        loading: sessionStreamsLoading,
    } = useQueryWithError(useGetSessionStreamsQuery, {
        termId: chosenTermId,
        courseIds: chosenCourses.toArray(),
    });
    const sessions = useMemo(() => {
        if (chosenWeek === -1) {
            if (sessionStreamsLoading || !sessionStreamsData) {
                return [];
            }
            return sessionStreamsData.sessionStreams.map((sessionStream) => ({
                id: sessionStream.id,
                name: sessionStream.name,
                startTime: sessionStream.startTime,
                endTime: sessionStream.endTime,
                day: sessionStream.day,
            }));
        } else {
            if (sessionsLoading || !sessionsData) {
                return [];
            }
            return sessionsData.sessions.map((session) => ({
                id: session.id,
                name: session.sessionStream.name,
                startTime: session.sessionStream.startTime,
                endTime: session.sessionStream.endTime,
                day: session.sessionStream.day as IsoDay,
            }));
        }
    }, [
        chosenWeek,
        sessionsLoading,
        sessionsData,
        sessionStreamsData,
        sessionStreamsLoading,
    ]);
    return (
        <Loadable isLoading={sessionsLoading}>
            <Timetable
                sessions={sessions}
                displayedDays={displayedDays}
                startTime={dayStartTime}
                endTime={dayEndTime}
                renderDay={(dayProps, key) => (
                    <Day
                        {...dayProps}
                        renderTimeSlot={(key) => <TimeSlot key={key} />}
                        renderSession={(
                            sessionProps: SessionProps,
                            key,
                        ) => (
                            <TimetableSession
                                {...sessionProps}
                                key={key}
                            />
                        )}
                        key={key}
                    />
                )}
            />
        </Loadable>
    );
};
