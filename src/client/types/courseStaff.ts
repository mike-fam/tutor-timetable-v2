import { CourseStaffsQuery } from "../generated/graphql";
import { ArrayElement } from "./helpers";

export enum StaffSeniority {
    NEW = "New",
    EXPERIENCED = "Experienced",
}

export type CourseStaffResponseType = ArrayElement<
    CourseStaffsQuery["courseStaffs"]
>;
