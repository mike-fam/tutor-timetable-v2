import React, { useEffect, useMemo, useState } from "react";
import { AddOrSelect } from "../../components/admin/AddOrSelect";
import { CourseForm } from "../../components/admin/CourseForm";
import {
    useMutationWithStatus,
    useQueryWithError,
} from "../../hooks/useApolloHooksWithError";
import {
    CourseInput,
    CreateCourseMutation,
    useCoursesQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
} from "../../generated/graphql";
import { Divider } from "@chakra-ui/react";
import { Map } from "immutable";

export const AdminCourseContainer: React.FC = () => {
    const [chosenCourse, setChosenCourse] = useState<string>();
    const [updated, setUpdated] = useState(false);
    const [createCourse, { data: createdCourse, loading: isCreatingCourse }] =
        useMutationWithStatus(useCreateCourseMutation, {
            errorPolicy: "all",
        });
    const [updateCourse, { data: updatedCourse, loading: isUpdatingCourse }] =
        useMutationWithStatus(useUpdateCourseMutation, {
            errorPolicy: "all",
        });
    const { data: fetchedCourses } = useQueryWithError(useCoursesQuery, {
        errorPolicy: "all",
        pollInterval: 10000,
        fetchPolicy: "cache-and-network",
    });
    const [courses, setCourses] = useState(
        Map<string, CreateCourseMutation["createCourse"]>()
    );
    useEffect(() => {
        if (!fetchedCourses) {
            return;
        }
        fetchedCourses.courses.forEach((course) =>
            setCourses((prev) => prev.set(course.id, course))
        );
    }, [fetchedCourses]);
    useEffect(() => {
        if (!createdCourse) {
            return;
        }
        setCourses((prev) =>
            prev.set(createdCourse.createCourse.id, createdCourse.createCourse)
        );
    }, [createdCourse]);
    useEffect(() => {
        if (!updatedCourse) {
            return;
        }
        setCourses((prev) =>
            prev.set(updatedCourse.updateCourse.id, updatedCourse.updateCourse)
        );
    }, [updatedCourse]);
    const initialValues = useMemo<CourseInput>(() => {
        if (!chosenCourse) {
            return {
                code: "",
                title: "",
            };
        }
        return courses.get(chosenCourse)!;
    }, [courses, chosenCourse]);
    useEffect(() => {
        console.log(updated);
    }, [updated]);
    return (
        <>
            <AddOrSelect
                elementType="Course"
                elements={courses
                    .map(
                        (course) => [course.id, course.code] as [string, string]
                    )
                    .valueSeq()
                    .toArray()}
                onAdd={() => {
                    setChosenCourse(void 0);
                    setUpdated(true);
                }}
                onSelect={(courseCode) => {
                    setChosenCourse(courseCode);
                    setUpdated(true);
                }}
                selectedValue={chosenCourse}
            />
            <Divider my={4} />
            {updated && (
                <CourseForm
                    loading={isUpdatingCourse || isCreatingCourse}
                    submit={async (values) => {
                        if (!chosenCourse) {
                            await createCourse({
                                variables: {
                                    courseInput: values,
                                },
                            });
                            setUpdated(false);
                        } else {
                            await updateCourse({
                                variables: {
                                    courseInput: {
                                        id: chosenCourse,
                                        ...values,
                                    },
                                },
                            });
                            setUpdated(false);
                        }
                    }}
                    editMode={chosenCourse ? "edit" : "add"}
                    initialValues={initialValues}
                />
            )}
        </>
    );
};
