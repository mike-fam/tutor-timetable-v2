import React, { useCallback, useEffect, useState } from "react";
import { CheckboxList } from "../components/CheckboxList";
import { Map, Set } from "immutable";

type Props = {};

export const CourseSelectContainer: React.FunctionComponent<Props> = () => {
    const [courses, setCourses] = useState(Map<number, string>());

    const [selectedCourses, setSelectedCourses] = useState(Set<number>());

    const selectCourse = useCallback(
        (courseId: number, selected: boolean = true) => {
            setSelectedCourses((prev) =>
                selected ? prev.add(courseId) : prev.remove(courseId)
            );
        },
        []
    );

    // setup dummy data
    useEffect(() => {
        setCourses((prev) => prev.set(1, "CSSE1001"));
        setCourses((prev) => prev.set(2, "CSSE2002"));
        setCourses((prev) => prev.set(3, "DECO3801"));
        selectCourse(1);
        selectCourse(2);
        selectCourse(3);
    }, [selectCourse]);

    return (
        <div>
            <CheckboxList
                elements={courses}
                selectedElements={selectedCourses}
                selectElement={selectCourse}
                selectAllLabel="Select courses"
            />
        </div>
    );
};
