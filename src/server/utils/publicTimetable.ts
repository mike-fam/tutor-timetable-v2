import axios from "axios";
import { TermType } from "../types/term";
import { Course, Term } from "../entities";
import { PublicTimetableData } from "../types/publicTimetable";
import qs from "qs";
import { SessionType } from "../types/session";

export const termTypeToTimetableParam = (termType: TermType): string => {
    switch (termType) {
        case TermType.SEMESTER_1:
            return "S1";
        case TermType.SEMESTER_2:
            return "S2";
        case TermType.SUMMER_SEMESTER:
            return "S3";
        case TermType.TRIMESTER_1:
            return "S5";
        case TermType.TRIMESTER_2:
            return "S6";
        case TermType.TRIMESTER_3:
            return "S7";
        default:
            // NOT REACHED
            throw new Error("Invalid term type");
    }
};

export const getPublicTimetableData = async (
    term: Term,
    course: Course,
    sessionTypes: SessionType[]
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
    const data = qs.stringify(
        {
            semester: termTypeToTimetableParam(term.type),
            campus: "ALL",
            type: sessionTypes,
            days: ["1", "2", "3", "4", "5", "6", "0"],
            "start-time": "00:00",
            "end-time": "23:00",
            "search-term": course.code,
        },
        { indices: false }
    );
    const response = await axios.post<PublicTimetableData>(
        url,
        data,
        defaultConfig
    );
    return response.data;
};
