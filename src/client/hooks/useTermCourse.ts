import { useCallback, useState } from "react";
import { defaultStr } from "../constants";

export const useTermCourse = () => {
    const [termId, setChosenTermId] = useState(defaultStr);
    const [courseId, changeCourse] = useState(defaultStr);
    const changeTerm = useCallback((termId) => {
        setChosenTermId(termId);
        changeCourse(defaultStr);
    }, []);
    return {
        termId,
        changeTerm,
        courseId,
        changeCourse,
    };
};
