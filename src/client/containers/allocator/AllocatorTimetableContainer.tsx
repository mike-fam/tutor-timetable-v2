import React, { useContext, useEffect } from "react";
import { Loadable } from "../../components/helpers/Loadable";
import { useGetSessionStreamsLazyQuery } from "../../generated/graphql";
import { notSet } from "../../constants";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { TimetableSession } from "../../components/timetable/TimetableSession";
import { TimetableSessionType } from "../../types/timetable";

type Props = {
    sessions: TimetableSessionType[];
    loading: boolean;
};

export const AllocatorTimetableContainer: React.FC<Props> = ({
    sessions,
    loading,
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
                        renderSession={(sessionProps, key) => (
                            <TimetableSession {...sessionProps} key={key} />
                        )}
                    />
                )}
            />
        </Loadable>
    );
};
