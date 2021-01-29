import React, { useCallback, useContext, useEffect, useState } from "react";
import { Map } from "immutable";
import { useMyCoursesQuery } from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { TimetableContext } from "../../utils/timetable";
import { Loadable } from "../../components/helpers/Loadable";
import { CheckboxList } from "../../components/helpers/CheckBoxList";

type Props = {};

export const CourseCheckboxListContainer: React.FunctionComponent<Props> = () => {
    const { data, loading } = useQueryWithError(useMyCoursesQuery, {});
    const [courses, setCourses] = useState(Map<number, string>());
    const { chosenCourses, setChosenCourses, chosenTermId } = useContext(
        TimetableContext
    );
    useEffect(() => {
        if (loading) {
            return;
        }
        if (!data?.me?.courseStaffs || data.me.courseStaffs.length === 0) {
            return;
        }
        for (const courseStaff of data.me.courseStaffs) {
            const { id, code } = courseStaff.timetable.course;
            if (courseStaff.timetable.term.id !== chosenTermId) {
                setCourses((prev) => prev.remove(id));
            } else {
                setCourses((prev) => prev.set(id, code));
            }
        }
    }, [loading, data, chosenTermId]);
    const selectCourse = useCallback(
        (courseId: number, selected: boolean) => {
            setChosenCourses((prev) =>
                selected ? prev.add(courseId) : prev.remove(courseId)
            );
        },
        [setChosenCourses]
    );

    return (
        <Loadable isLoading={data === undefined}>
            <CheckboxList
                elements={courses}
                selectElement={selectCourse}
                selectedElements={chosenCourses}
                selectAllLabel="Select all courses"
            />
        </Loadable>
    );
};
