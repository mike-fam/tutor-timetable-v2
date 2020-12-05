import { FormLabel, Select } from "@chakra-ui/react";
import React from "react";

type Props = {
    courses: Array<String>;
};

export const CourseSelect: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            <FormLabel>Courses</FormLabel>
            <Select>
                {props.courses.map((course, index) => (
                    <option key={index}>{course}</option>
                ))}
            </Select>
        </div>
    );
};
