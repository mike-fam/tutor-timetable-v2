import { CourseStaffsQuery } from "../generated/graphql";
import { ArrayElement } from "./helper";

export enum StaffSeniority {
    NEW = "New",
    EXPERIENCED = "Experienced",
}

export type CourseStaffResponseType = ArrayElement<
    CourseStaffsQuery["courseStaffs"]
>;
