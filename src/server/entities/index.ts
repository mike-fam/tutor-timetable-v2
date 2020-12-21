import { registerEnumType } from "type-graphql";
import { IsoDay } from "../../types/date";
import { SessionType } from "../../types/session";

registerEnumType(IsoDay, {
    name: "IsoDay",
});

registerEnumType(SessionType, {
    name: "SessionType",
});

export { Course } from "./Course";
export { CourseStaff } from "./CourseStaff";
export { Preference } from "./Preference";
export { Session } from "./Session";
export { SessionAllocation } from "./SessionAllocation";
export { StaffRequest } from "./StaffRequest";
export { StreamAllocation } from "./StreamAllocation";
export { Term } from "./Term";
export { Timetable } from "./Timetable";
export { User } from "./User";
