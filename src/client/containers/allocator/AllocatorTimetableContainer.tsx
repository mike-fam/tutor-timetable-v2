import React, { useContext, useEffect } from "react";
import { Loadable } from "../../components/helpers/Loadable";
import { useGetSessionStreamsLazyQuery } from "../../generated/graphql";
import { notSet } from "../../constants";
import { Timetable } from "../../components/timetable/Timetable";
import { TimetableSettingsContext } from "../../utils/timetable";
import { Day } from "../../components/timetable/Day";
import { TimeSlot } from "../../components/timetable/TimeSlot";
import { TimetableSession } from "../../components/timetable/TimetableSession";

type Props = {
    courseId: number;
    termId: number;
};

export const AllocatorTimetableContainer: React.FC<Props> = ({
    courseId,
    termId,
}) => {
    const { displayedDays } = useContext(TimetableSettingsContext);
    const [
        getSessionStream,
        { data, loading },
    ] = useGetSessionStreamsLazyQuery();
    useEffect(() => {
        if (termId === notSet || courseId === notSet) {
            return;
        }
        getSessionStream({
            variables: {
                termId,
                courseIds: [courseId],
            },
        });
    }, [termId, courseId, getSessionStream]);
    if (termId === notSet || courseId === notSet) {
        return null;
    }
    return (
        <Loadable isLoading={loading}>
            <Timetable
                sessions={data?.sessionStreams || []}
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
