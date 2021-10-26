import React, { useEffect } from "react";
import { TimetableForm } from "../../components/admin/TimetableForm";
import {
    CourseQuery,
    TermQuery,
    TimetableInput,
    useCoursesQuery,
    useTermsQuery,
} from "../../generated/graphql";
import { AdminEditMode } from "../../types/admin";
import { useQueryWithError } from "../../hooks/useApolloHooksWithError";
import { useMap } from "../../hooks/useMap";
import { formatTerm } from "../../utils/term";

type Props = {
    editMode: AdminEditMode;
    initialValues?: TimetableInput;
    submit: (values: TimetableInput) => void;
    loading?: boolean;
};

export const TimetableFormContainer: React.FC<Props> = ({
    submit,
    editMode,
    loading,
    initialValues,
}) => {
    const { data: coursesData } = useQueryWithError(useCoursesQuery);
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const { state: coursesMap, replaceAll: replaceCourses } =
        useMap<CourseQuery["course"]>();
    const { state: termMap, replaceAll: replaceTerms } =
        useMap<TermQuery["term"]>();

    useEffect(() => {
        if (!coursesData) {
            return;
        }
        replaceCourses(
            coursesData.courses.map((course) => [course.id, course])
        );
    }, [coursesData, replaceCourses]);

    useEffect(() => {
        if (!termsData) {
            return;
        }
        replaceTerms(termsData.terms.map((term) => [term.id, term]));
    }, [termsData, replaceTerms]);

    return (
        <TimetableForm
            submit={submit}
            editMode={editMode}
            loading={loading}
            initialValues={initialValues}
            courseOptions={coursesMap.keySeq().toArray()}
            termOptions={termMap.keySeq().toArray()}
            courseIdToText={(courseId) => coursesMap.get(courseId)!.code}
            termIdToText={(termId) => {
                const term = termMap.get(termId)!;
                return formatTerm(term);
            }}
        />
    );
};
