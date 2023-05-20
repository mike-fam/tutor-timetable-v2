import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Map, Set } from "immutable";
import { useMyCoursesQuery } from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useApolloHooksWithError";
import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

type Props = {
    chosenCourses: Set<string>;
    setChosenCourses: Dispatch<SetStateAction<Set<string>>>;
    chosenTermId: string;
};

export const CourseCheckboxListContainer2: FC<Props> = ({
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

    return (
        <Menu matchWidth={true} gutter={0}>
            <MenuButton as={Box} w="100%">
                <Button
                    rightIcon={<ChevronDownIcon />}
                    variant="outline"
                    fontWeight="normal"
                    w="100%"
                    justifyContent="space-between"
                >
                    {Array.from(
                        chosenCourses.map((courseId) => courses.get(courseId))
                    ).join(", ") || "Select Courses"}
                </Button>
            </MenuButton>
            <MenuList w="100%">
                <MenuOptionGroup
                    title="Courses"
                    type="checkbox"
                    onChange={(values) => {
                        setChosenCourses(() => {
                            return Set.of(...values);
                        });
                    }}
                    value={chosenCourses.toArray()}
                >
                    {courses
                        .map((courseCode, courseId) => (
                            <MenuItemOption value={courseId} key={courseId}>
                                {courseCode}
                            </MenuItemOption>
                        ))
                        .toArray()}
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
};
