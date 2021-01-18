import React from "react";
import { Box, Checkbox, Stack } from "@chakra-ui/react";
import { Map, Set } from "immutable";

type Props = {
    courses: Map<number, string>;
    selectedCourses: Set<number>;
    selectCourse: (courseId: number, selected: boolean) => void;
};

export const CourseSelect: React.FunctionComponent<Props> = ({
    courses,
    selectCourse,
    selectedCourses,
}) => {
    return (
        <Box>
            <Checkbox
                isChecked={selectedCourses.size === courses.size}
                onChange={(e) => {
                    courses.forEach((_, id) => {
                        selectCourse(id, e.target.checked);
                    });
                }}
                isIndeterminate={
                    selectedCourses.size !== courses.size &&
                    selectedCourses.size !== 0
                }
            >
                All Courses
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {courses.entrySeq().map(([id, course]) => (
                    <Checkbox
                        // https://github.com/chakra-ui/chakra-ui/issues/2428#issuecomment-724002563
                        isChecked={selectedCourses.contains(id)}
                        onChange={(e) => {
                            selectCourse(id, e.target.checked);
                        }}
                        key={id}
                    >
                        {course}
                    </Checkbox>
                ))}
            </Stack>
        </Box>
    );
};
