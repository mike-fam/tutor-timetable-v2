import { Course, Term, TermType } from "../generated/graphql";
import axios from "axios";
import { PublicTimetableData } from "../types/publicTimetable";

type TermLike = Partial<Term> & Pick<Term, "id" | "year" | "type">;
type CourseLike = Partial<Course> & Pick<Course, "id" | "code">;

export const termTypeToTimetableParam = (termType: TermType): string => {
    switch (termType) {
        case TermType.Semester_1:
            return "S1";
        case TermType.Semester_2:
            return "S2";
        case TermType.SummerSemester:
            return "S3";
        case TermType.Trimester_1:
            return "S5";
        case TermType.Trimester_2:
            return "S6";
        case TermType.Trimester_3:
            return "S7";
        default:
            // NOT REACHED
            throw new Error("Invalid term type");
    }
};

export const getPublicTimetableData = async (
    term: TermLike,
    course: CourseLike
) => {
    const url = `https://timetable.my.uq.edu.au/${
        term.year % 2 === 0 ? "even" : "odd"
    }/rest/timetable/subjects`;
    const defaultConfig = {
        headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
    };
    const data = {
        semester: termTypeToTimetableParam(term.type),
        campus: "ALL",
        type: "ALL",
        days: ["1", "2", "3", "4", "5", "6", "0"],
        "start-time": "00:00",
        "end-time": "23:00",
        "search-term": course.code,
    };
    const response = await axios.post<PublicTimetableData>(
        url,
        data,
        defaultConfig
    );
    return response.data;
};
