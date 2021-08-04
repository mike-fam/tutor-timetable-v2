import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Map, Set } from "immutable";
import { useMyCoursesQuery } from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useApolloHooksWithError";
import { Loadable } from "../../components/helpers/Loadable";
import { CheckboxList } from "../../components/helpers/CheckBoxList";

type Props = {
    chosenCourses: Set<string>;
    setChosenCourses: Dispatch<SetStateAction<Set<string>>>;
    chosenTermId: string;
};

export const CourseCheckboxListContainer: React.FunctionComponent<Props> = ({
    chosenCourses,
    setChosenCourses,
    chosenTermId,
}) => {
    const { data } = useQueryWithError(useMyCoursesQuery, {});
    const [courses, setCourses] = useState(Map<string, string>());
    useEffect(() => {
        if (!data?.me?.courseStaffs || data.me.courseStaffs.length === 0) {
            return;
        }
        setCourses((prev) => prev.clear());
        for (const courseStaff of data.me.courseStaffs) {
            const { id, code } = courseStaff.timetable.course;
            if (courseStaff.timetable.term.id === chosenTermId) {
                setCourses((prev) => prev.set(id, code));
                setChosenCourses((prev) =>
                    prev.add(courseStaff.timetable.course.id)
                );
            }
        }
    }, [data, chosenTermId, setChosenCourses]);
    const selectCourse = useCallback(
        (courseId: string, selected: boolean) => {
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
