import { useLazyQueryWithError } from "./useApolloHooksWithError";
import { Role, useCourseStaffsLazyQuery } from "../generated/graphql";
import { useEffect, useState } from "react";
import { Map } from "immutable";

export const useUsersOfCourse = (courseId: string, termId: string) => {
    const [userMap, setUserMap] = useState(
        Map<
            string,
            { name: string; username: string; role: Role; isNew: boolean }
        >()
    );
    const [fetchCourseStaff, { data }] = useLazyQueryWithError(
        useCourseStaffsLazyQuery,
        {
            variables: {
                courseTermInput: {
                    courseId,
                    termId,
                },
            },
        }
    );
    useEffect(() => {
        if (!courseId || !termId) {
            return;
        }
        fetchCourseStaff();
    }, [courseId, termId, fetchCourseStaff]);
    useEffect(() => {
        if (!data) {
            return;
        }
        data.courseStaffs.forEach((courseStaff) =>
            setUserMap((prev) =>
                prev.set(courseStaff.user.id, {
                    name: courseStaff.user.name,
                    username: courseStaff.user.username,
                    role: courseStaff.role,
                    isNew: courseStaff.isNew,
                })
            )
        );
    });
    return userMap;
};
