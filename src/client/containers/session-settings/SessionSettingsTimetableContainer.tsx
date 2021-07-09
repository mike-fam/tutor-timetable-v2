import React, { useContext } from "react";
import { Loadable } from "../../components/helpers/Loadable";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import {
    TimetableSession,
    TimetableSessionProps,
} from "../../components/timetable/TimetableSession";
import { TimetableSessionType } from "../../types/timetable";
import { Map } from "immutable";
import { SessionTheme } from "../../types/session";
import { ClickableTimeslot } from "../../components/timetable/ClickableTimeslot";

type Props = {
    sessions: TimetableSessionType[];
    loading: boolean;
    sessionsData: Map<string, TimetableSessionProps>;
};

export const SessionSettingsTimetableContainer: React.FC<Props> = ({
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
                        renderTimeSlot={(key, time, day) => (
                            <ClickableTimeslot
                                key={key}
                                addNewTimeslot={() => {}}
                                time={time}
                                day={day}
                            />
                        )}
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
                                theme: SessionTheme.PRIMARY,
                            }
                        }
                    />
                )}
            />
        </Loadable>
    );
};
