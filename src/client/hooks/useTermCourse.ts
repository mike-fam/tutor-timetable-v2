import { useCallback, useState } from "react";
import { notSet } from "../constants";

export const useTermCourse = () => {
    const [term, setChosenTermId] = useState(notSet);
    const [course, changeCourse] = useState(notSet);
    const changeTerm = useCallback((termId) => {
        setChosenTermId(termId);
        changeCourse(notSet);
    }, []);
    return {
        term,
        changeTerm,
        course,
        changeCourse,
    };
};
