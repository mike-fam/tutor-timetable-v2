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
    useEffect(() => {
        if (loading) {
            return;
        }
        if (!data?.me?.courseStaffs || data.me.courseStaffs.length === 0) {
            return;
        }
        for (const courseStaff of data.me.courseStaffs) {
            setCourses((prev) => {
                const { id, code } = courseStaff.timetable.course;
                return prev.set(id, code);
            });
        }
    }, [loading, data]);
    const { chosenCourses, setChosenCourses } = useContext(TimetableContext);
    const selectCourse = useCallback(
        (courseId: number, selected: boolean) => {
            setChosenCourses((prev) =>
                selected ? prev.add(courseId) : prev.remove(courseId)
            );
        },
        [setChosenCourses]
    );

    return (
        <Loadable isLoading={loading}>
            <CheckboxList
                elements={courses}
                selectElement={selectCourse}
                selectedElements={chosenCourses}
                selectAllLabel="Select all courses"
            />
        </Loadable>
    );
};
