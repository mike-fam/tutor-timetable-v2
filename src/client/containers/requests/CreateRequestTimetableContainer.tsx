import React, { useMemo, useState } from "react";
import { RequestTimetableContainer } from "./RequestTimetableContainer";
import { SessionTheme } from "../../types/timetable";
import { useTermsQuery } from "../../generated/graphql";
import { WeekNav } from "../../components/WeekNav";
import { notSet } from "../../constants";
import differenceInWeeks from "date-fns/differenceInWeeks";
import parseISO from "date-fns/parseISO";

type Props = {
    chosenCourse: number;
    chosenTerm: number;
};

// TODO: display sessions that user can choose
// 	no sessions that user is assigned to
//		warning on sessions that user is not available on
// TODO: session can be clicked on. Multiple sessions can be chosen

export const CreateRequestTimetableContainer: React.FC<Props> = ({
    chosenCourse,
    chosenTerm,
}) => {
    const { data: termsData } = useTermsQuery();
    const [chosenWeek, chooseWeek] = useState(notSet);
    const term = useMemo(
        () => termsData?.terms.filter((term) => term.id === chosenTerm)[0],
        [termsData]
    );
    const weeksNum = useMemo(() => {
        if (!term) {
            return 0;
        }
        return differenceInWeeks(
            parseISO(term.endDate),
            parseISO(term.startDate)
        );
    }, [term]);

    return (
        <>
            <RequestTimetableContainer
                chosenCourse={chosenCourse}
                chosenTerm={chosenTerm}
                chosenWeek={chosenWeek}
                checkDisabled={() => false}
                getTheme={() => SessionTheme.PRIMARY}
                filterSessions={(e) => e}
            />
            <WeekNav
                showAllWeeks={false}
                weekNames={term?.weekNames || []}
                weeksNum={weeksNum}
                chosenWeek={chosenWeek}
                chooseWeek={chooseWeek}
            />
        </>
    );
};
