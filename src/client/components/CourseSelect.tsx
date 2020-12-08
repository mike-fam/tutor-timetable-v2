import { Checkbox, Stack } from "@chakra-ui/react";
import React from "react";

// PLaceholder name for the function callback.
type Props = {
    courses: Array<String>;
    callbackFunc: Function;
};

export const CourseSelect: React.FunctionComponent<Props> = (props: Props) => {
    const [checkedItems, setCheckedItems] = React.useState(
        new Array<boolean>(props.courses.length).fill(false)
    );

    const allChecked = checkedItems.every(Boolean);

    const checkItems = (index: number, value: boolean, course: String) => {
        let temp: Array<boolean> = [...checkedItems];
        temp[index] = value;
        props.callbackFunc(course, value);
        setCheckedItems(temp);
    };

    return (
        <div>
            {/*Onchange might need to be modified here depending on callback logic*/}
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
                            checkItems(index, !checkedItems[index], course);
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
