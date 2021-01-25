import React, { useEffect, useState } from "react";
import { Dropdown } from "../components/helpers/Dropdown";
import { useMyCoursesQuery } from "../generated/graphql";
import { Loadable } from "../components/helpers/Loadable";
import { Map } from "immutable";
import { useQueryWithError } from "../hooks/useQueryWithError";

type Props = {
    chooseCourse: (termId: number) => void;
    chosenCourse: number;
    chosenTerm: number;
};

export const CourseSelectContainer: React.FC<Props> = ({
    chooseCourse,
    chosenCourse,
    chosenTerm,
}) => {
    const { loading, data } = useQueryWithError(useMyCoursesQuery, {});
    const [coursesMap, setCoursesMap] = useState(Map<number, string>());
    useEffect(() => {
        if (loading || !data?.me?.courseStaffs) {
            return;
        }
        for (const courseStaff of data.me.courseStaffs) {
            if (courseStaff.timetable.term.id === chosenTerm) {
                setCoursesMap((prev) =>
                    prev.set(
                        courseStaff.timetable.course.id,
                        courseStaff.timetable.course.code
                    )
                );
            } else {
                setCoursesMap((prev) =>
                    prev.remove(courseStaff.timetable.course.id)
                );
            }
        }
    }, [loading, data, chosenTerm]);
    return (
        <Loadable isLoading={loading}>
            <Dropdown
                onChange={(e) => chooseCourse(Number(e.target.value))}
                value={chosenCourse}
                options={coursesMap}
            />
        </Loadable>
    );
};
