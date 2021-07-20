import React, { useEffect, useState } from "react";
import { Dropdown } from "../components/helpers/Dropdown";
import { Role, useMyCoursesQuery } from "../generated/graphql";
import { Loadable } from "../components/helpers/Loadable";
import { Map } from "immutable";
import { useQueryWithError } from "../hooks/useApolloHooksWithError";

type Props = {
    chooseCourse: (termId: string) => void;
    chosenCourse: string;
    chosenTerm: string;
    coordinatorOnly?: boolean;
    maxW?: number | string;
    editable?: boolean;
};

export const CourseSelectContainer: React.FC<Props> = ({
    chooseCourse,
    chosenCourse,
    chosenTerm,
    coordinatorOnly = false,
    maxW,
    editable = true,
}) => {
    const { loading, data } = useQueryWithError(useMyCoursesQuery, {});
    const [coursesMap, setCoursesMap] = useState(Map<string, string>());
    useEffect(() => {
        if (loading || !data?.me?.courseStaffs) {
            return;
        }
        setCoursesMap((prev) => prev.clear());
        for (const courseStaff of data.me.courseStaffs) {
            if (
                courseStaff.timetable.term.id === chosenTerm &&
                (!coordinatorOnly ||
                    courseStaff.role === Role.CourseCoordinator)
            ) {
                setCoursesMap((prev) =>
                    prev.set(
                        courseStaff.timetable.course.id,
                        courseStaff.timetable.course.code
                    )
                );
            }
        }
    }, [loading, data, chosenTerm, coordinatorOnly]);
    return (
        <Loadable isLoading={data === undefined}>
            <Dropdown
                isDisabled={!editable}
                onChange={(e) => chooseCourse(e.target.value)}
                value={chosenCourse}
                options={coursesMap}
                maxW={maxW}
            />
        </Loadable>
    );
};
