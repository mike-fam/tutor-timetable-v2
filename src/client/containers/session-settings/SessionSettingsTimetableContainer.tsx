import React, { useContext } from "react";
import { Loadable } from "../../components/helpers/Loadable";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { TimetableSession } from "../../components/timetable/TimetableSession";
import { SessionTheme } from "../../types/session";
import { ClickableTimeslot } from "../../components/timetable/ClickableTimeslot";

type Props = {
    courseId: string;
    termId: string;
};

export const SessionSettingsTimetableContainer: React.FC<Props> = ({
    courseId,
    termId,
}) => {
    const { displayedDays } = useContext(TimetableSettingsContext);
    return (
        <Loadable isLoading={false}>
            <Timetable
                sessions={[]}
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
                        renderSession={(sessionProps, key) => (
                            <TimetableSession
                                {...sessionProps}
                                key={key}
                                custom={(sessionId) => ({
                                    allocation: [],
                                    location: "",
                                    theme: SessionTheme.PRIMARY,
                                })}
                            />
                        )}
                    />
                )}
            />
        </Loadable>
    );
};
