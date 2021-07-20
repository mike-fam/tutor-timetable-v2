import { useCallback, useEffect, useState } from "react";
import { defaultStr } from "../constants";
import { useCourseLazyQuery, useTermLazyQuery } from "../generated/graphql";
import { useLazyQueryWithError } from "./useApolloHooksWithError";

export const useTermCourse = () => {
    const [termId, setChosenTermId] = useState(defaultStr);
    const [courseId, changeCourse] = useState(defaultStr);
    const changeTerm = useCallback((termId) => {
        setChosenTermId(termId);
        changeCourse(defaultStr);
    }, []);
    const [fetchTerm, { data: termData }] = useLazyQueryWithError(
        useTermLazyQuery,
        {}
    );
    const [fetchCourse, { data: courseData }] = useLazyQueryWithError(
        useCourseLazyQuery,
        {}
    );
    useEffect(() => {
        if (termId === defaultStr) {
            return;
        }
        fetchTerm({
            variables: {
                termId,
            },
        });
    }, [termId, fetchTerm]);
    useEffect(() => {
        if (courseId === defaultStr) {
            return;
        }
        fetchCourse({
            variables: {
                courseId,
            },
        });
    }, [courseId, fetchCourse]);
    return {
        termId,
        changeTerm,
        courseId,
        changeCourse,
        term: termData?.term,
        course: courseData?.course,
    };
};
