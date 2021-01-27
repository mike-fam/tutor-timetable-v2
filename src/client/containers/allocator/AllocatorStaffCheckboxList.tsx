import { Checkbox, Grid } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { Role, useCourseStaffsQuery } from "../../generated/graphql";
import { Loadable } from "../../components/helpers/Loadable";
import { Set } from "immutable";
import sortBy from "lodash/sortBy";

type Props = {
    courseId: number;
    termId: number;
    selectedStaff: Set<number>;
    setSelectedStaff: Dispatch<SetStateAction<Set<number>>>;
};

export const AllocatorStaffCheckboxList: React.FC<Props> = ({
    courseId,
    termId,
    selectedStaff,
    setSelectedStaff,
}) => {
    const { loading, data } = useQueryWithError(useCourseStaffsQuery, {
        courseTermInput: {
            courseId,
            termId,
        },
    });
    useEffect(() => {
        if (loading || !data?.courseStaffs) {
            return;
        }
        for (const courseStaff of data.courseStaffs) {
            if (courseStaff.role === Role.CourseCoordinator) {
                continue;
            }
            setSelectedStaff((prev) => prev.add(courseStaff.user.id));
        }
    }, [loading, data, setSelectedStaff]);
    return (
        <Loadable isLoading={loading}>
            {data?.courseStaffs ? (
                <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    {sortBy(data.courseStaffs, (courseStaff) => {
                        return [courseStaff.role, courseStaff.user.name];
                    }).map((courseStaff) => {
                        const id = courseStaff.user.id;
                        return (
                            <Checkbox
                                onChange={(event) => {
                                    setSelectedStaff((prev) =>
                                        event.target.checked
                                            ? prev.add(id)
                                            : prev.remove(id)
                                    );
                                }}
                                key={id}
                                isChecked={selectedStaff.includes(id)}
                            >
                                {courseStaff.user.name}
                                {courseStaff.role === Role.CourseCoordinator
                                    ? " (Course Coordinator)"
                                    : ""}
                            </Checkbox>
                        );
                    })}
                </Grid>
            ) : null}
        </Loadable>
    );
};
