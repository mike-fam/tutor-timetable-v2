import React from "react";
import { CourseSelect } from "../components/CourseSelect";

type Props = {};

export const CourseSelectContainer: React.FunctionComponent<Props> = () => {
    const courses = ["CSSE1001", "CSSE2002", "DECO3801"];

    const callbackTest = (course: string, value: boolean) => {
        console.log(course, "has been set to", value);
    };

    return (
        <div>
            <CourseSelect courses={courses} callbackFunc={callbackTest} />
        </div>
    );
};
