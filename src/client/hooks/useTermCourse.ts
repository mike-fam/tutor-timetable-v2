import { useCallback, useState } from "react";
import { notSet } from "../constants";

export const useTermCourse = () => {
    const [termId, setChosenTermId] = useState(notSet);
    const [courseId, changeCourse] = useState(notSet);
    const changeTerm = useCallback((termId) => {
        setChosenTermId(termId);
        changeCourse(notSet);
    }, []);
    return {
        termId,
        changeTerm,
        courseId,
        changeCourse,
    };
};
