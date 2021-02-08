import React, { useContext } from "react";
import { Loadable } from "../../components/helpers/Loadable";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import {
    TimetableSession,
    TimetableSessionProps,
} from "../../components/timetable/TimetableSession";
import { TimetableSessionType } from "../../types/timetable";
import { Map } from "immutable";

type Props = {
    sessions: TimetableSessionType[];
    loading: boolean;
    sessionsData: Map<number, TimetableSessionProps>;
};

export const AllocatorTimetableContainer: React.FC<Props> = ({
    sessions,
    loading,
    sessionsData,
}) => {
    const { displayedDays } = useContext(TimetableSettingsContext);
    return (
        <Loadable isLoading={loading}>
            <Timetable
                sessions={sessions}
                displayedDays={displayedDays}
                renderDay={(dayProps, key) => (
                    <Day
                        {...dayProps}
                        key={key}
                        renderTimeSlot={(key) => <TimeSlot key={key} />}
                        renderSession={(
                            sessionProps,
                            key,
                            moreProps: TimetableSessionProps
                        ) => (
                            <TimetableSession
                                {...sessionProps}
                                key={key}
                                {...moreProps}
                            />
                        )}
                        getSessionProps={(sessionId) =>
                            sessionsData.get(sessionId) || {
                                allocation: [],
                                location: "",
                            }
                        }
                    />
                )}
            />
        </Loadable>
    );
};
