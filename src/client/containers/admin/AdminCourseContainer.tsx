import React, { useEffect, useState } from "react";
import { AddOrSelect } from "../../components/admin/AddOrSelect";
import { CourseForm } from "../../components/admin/CourseForm";
import {
    useMutationWithError,
    useQueryWithError,
} from "../../hooks/useApolloHooksWithError";
import {
    useCoursesQuery,
    useCreateCourseMutation,
} from "../../generated/graphql";
import { Divider } from "@chakra-ui/react";

export const AdminCourseContainer: React.FC = () => {
    const [createCourse, { data: createdCourse }] = useMutationWithError(
        useCreateCourseMutation,
        {
            errorPolicy: "all",
        }
    );
    const { data: fetchedCourses } = useQueryWithError(useCoursesQuery, {
        errorPolicy: "all",
        pollInterval: 10000,
        fetchPolicy: "cache-and-network",
    });
    const [courses, setCourses] = useState<[string, string][]>([]);
    useEffect(() => {
        if (!fetchedCourses) {
            return;
        }
        setCourses(fetchedCourses.courses.map(({ id, code }) => [id, code]));
    }, [fetchedCourses]);
    useEffect(() => {
        if (!createdCourse) {
            return;
        }
        const { createCourse } = createdCourse;
        setCourses((prev) => prev.filter(([id]) => id !== createCourse.id));
        setCourses((prev) => [...prev, [createCourse.id, createCourse.code]]);
    }, [createdCourse]);
    return (
        <>
            <AddOrSelect
                elementType="Course"
                elements={courses}
                onAdd={() => {}}
                onSelect={() => {}}
            />
            <Divider my={4} />
            <CourseForm submit={() => {}} editMode="add" />
        </>
    );
};
