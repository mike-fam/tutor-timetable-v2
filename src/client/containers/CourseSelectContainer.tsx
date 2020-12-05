import React from "react";
import { CourseSelect } from "../components/CourseSelect";

type Props = {};

export const CourseSelectContainer: React.FunctionComponent<Props> = () => {
    const courses = ["CSSE1001", "CSSE2002", "DECO3801"];

    return (
        <div>
            <CourseSelect courses={courses} />
        </div>
    );
};
