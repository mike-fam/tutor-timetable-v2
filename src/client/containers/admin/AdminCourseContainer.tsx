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
    useDeleteCourseMutation,
    useUpdateCourseMutation,
} from "../../generated/graphql";
import { Button, Divider } from "@chakra-ui/react";
import { useMap } from "../../hooks/useMap";

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
    const [deleteCourse, { data: deletedCourse, loading: isDeletingCourse }] =
        useMutationWithStatus(useDeleteCourseMutation, {
            errorPolicy: "all",
        });
    const { data: fetchedCourses } = useQueryWithError(useCoursesQuery, {
        errorPolicy: "all",
        pollInterval: 10000,
        fetchPolicy: "cache-and-network",
    });
    const {
        state: courses,
        replaceAll: replaceAllCourses,
        set: setCourse,
        remove: removeCourse,
    } = useMap<CreateCourseMutation["createCourse"]>();
    useEffect(() => {
        if (!fetchedCourses) {
            return;
        }
        replaceAllCourses(
            fetchedCourses.courses.map((course) => [course.id, course])
        );
    }, [fetchedCourses, replaceAllCourses]);
    useEffect(() => {
        if (!createdCourse) {
            return;
        }
        setCourse(createdCourse.createCourse.id, createdCourse.createCourse);
    }, [createdCourse, setCourse]);
    useEffect(() => {
        if (!updatedCourse) {
            return;
        }
        setCourse(updatedCourse.updateCourse.id, updatedCourse.updateCourse);
    }, [updatedCourse, setCourse]);
    useEffect(() => {
        if (!deletedCourse) {
            return;
        }
        removeCourse(deletedCourse.deleteCourse);
        setChosenCourse(undefined);
        setUpdated(false);
    }, [deletedCourse, removeCourse]);
    const initialValues = useMemo<CourseInput>(() => {
        if (!chosenCourse) {
            return {
                code: "",
                title: "",
            };
        }
        return courses.get(chosenCourse)!;
    }, [courses, chosenCourse]);
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
                onSelect={(courseId) => {
                    setChosenCourse(courseId);
                    setUpdated(true);
                }}
                selectedValue={chosenCourse}
            />
            <Divider my={4} />
            {updated && (
                <>
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
                    {chosenCourse && (
                        <Button
                            mt={1}
                            onClick={() => {
                                deleteCourse({
                                    variables: {
                                        courseId: chosenCourse,
                                    },
                                });
                            }}
                            isLoading={isDeletingCourse}
                            colorScheme="red"
                        >
                            Delete Course
                        </Button>
                    )}
                </>
            )}
        </>
    );
};
