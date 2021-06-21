import React from "react";
import { useQuery } from "react-query";
import { getPublicTimetableData } from "../../utils/publicTimetable";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { useMyCoursesQuery } from "../../generated/graphql";
import { useDefaultTerm } from "../../hooks/useDefaultTerm";

type Props = {};

export const SessionSettingsPageContainer: React.FC<Props> = () => {
    const { data: myCoursesData } = useQueryWithError(useMyCoursesQuery, {});
    const { chosenTerm } = useDefaultTerm();
    const { data } = useQuery(
        [
            "public-timetable",
            myCoursesData?.me.courseStaffs[0].timetable.course.id,
            chosenTerm?.id,
        ],
        async () =>
            await getPublicTimetableData(
                chosenTerm!,
                myCoursesData!.me.courseStaffs[0].timetable.course
            ),
        { enabled: !!chosenTerm && !!myCoursesData }
    );
    return <pre>{JSON.stringify(data, null, 4)}</pre>;
};
