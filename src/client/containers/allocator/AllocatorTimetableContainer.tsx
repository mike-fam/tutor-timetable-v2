import React, { useContext } from "react";
import { Loadable } from "../../components/helpers/Loadable";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import {
    TimetableCustomSessionProps,
    TimetableSession,
} from "../../components/timetable/TimetableSession";
import { TimetableSessionType } from "../../types/timetable";
import { Map } from "immutable";
import { SessionTheme } from "../../types/session";

type Props = {
    sessions: TimetableSessionType[];
    loading: boolean;
    sessionsData: Map<string, TimetableCustomSessionProps>;
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
                    <Day<TimetableCustomSessionProps>
                        {...dayProps}
                        key={key}
                        renderTimeSlot={(key) => <TimeSlot key={key} />}
                        renderSession={(sessionProps, key) => (
                            <TimetableSession
                                {...sessionProps}
                                key={key}
                                custom={(sessionId) =>
                                    sessionsData.get(sessionId) || {
                                        allocation: [],
                                        location: "",
                                        theme: SessionTheme.PRIMARY,
                                    }
                                }
                            />
                        )}
                    />
                )}
            />
        </Loadable>
    );
};
