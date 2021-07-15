import React, { useContext } from "react";
import { Loadable } from "../../components/helpers/Loadable";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { ClickableTimeslot } from "../../components/timetable/ClickableTimeslot";
import { SessionSettingsUtils } from "../../hooks/useSessionSettings";
import { TimetableSession2 } from "../../components/timetable/TimetableSession2";
import { defaultInt } from "../../constants";
import { SessionSettingsTimetableSession } from "../../components/session-settings/SessionSettingsTimetableSession";
import { SessionSettingsTimetableStream } from "../../components/session-settings/SessionSettingsTimetableStream";
import { SessionTheme } from "../../types/session";

type Props = {
    loading: boolean;
    timetableState: SessionSettingsUtils["timetableState"];
    timetableActions: SessionSettingsUtils["actions"];
    week: number;
};

export const SessionSettingsTimetableContainer: React.FC<Props> = ({
    loading,
    timetableState,
    timetableActions,
    week,
}) => {
    const { displayedDays } = useContext(TimetableSettingsContext);
    const {} = timetableState;
    return (
        <Loadable isLoading={loading}>
            <Timetable
                sessions={[{
                    id: "",
                    startTime: 10,
                    endTime: 12,
                    day: 1,
                    name: "P01 Flexible",
                }]}
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
                        renderSession={(sessionProps) =>
                            week === defaultInt ? (
                                <SessionSettingsTimetableStream
                                    {...sessionProps}
                                    key={sessionProps.id}
                                    custom={(id) => ({
                                        courseCode: "",
                                        baseAllocation: [[], []],
                                        customAllocation: [],
                                        weekNames: [],
                                        location: "",
                                    })}
                                    onClick={(sessionId) => {
                                        console.log(sessionId);
                                    }}
                                />
                            ) : (
                                <SessionSettingsTimetableSession
                                    {...sessionProps}
                                    key={sessionProps.id}
                                    custom={(id) => ({
                                        allocation: [],
                                        location: "",
                                        courseCode: "",
                                    })}
                                    onClick={(sessionId) => {
                                        console.log(sessionId);
                                    }}
                                />
                            )
                        }
                    />
                )}
            />
        </Loadable>
    );
};
