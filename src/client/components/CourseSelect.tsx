import { Checkbox, Stack } from "@chakra-ui/react";
import React from "react";

type Props = {
    courses: Array<String>;
};

export const CourseSelect: React.FunctionComponent<Props> = (props: Props) => {
    const [checkedItems, setCheckedItems] = React.useState(
        new Array<boolean>(props.courses.length).fill(false)
    );

    const allChecked = checkedItems.every(Boolean);

    const checkItems = (index: number, value: boolean) => {
        let temp: Array<boolean> = [...checkedItems];
        temp[index] = value;
        setCheckedItems(temp);
    };

    return (
        <div>
            <Checkbox
                isChecked={allChecked}
                onChange={() => {
                    setCheckedItems(checkedItems.map((x) => !allChecked));
                }}
            >
                All Courses
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {props.courses.map((course, index) => (
                    <Checkbox
                        isChecked={checkedItems[index]}
                        onChange={() => {
                            checkItems(index, !checkedItems[index]);
                        }}
                        key={index}
                    >
                        {course}
                    </Checkbox>
                ))}
            </Stack>
        </div>
    );
};
