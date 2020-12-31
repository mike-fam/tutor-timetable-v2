import { registerEnumType } from "type-graphql";
import { IsoDay } from "../../types/date";
import { SessionType } from "../../types/session";
import { TermType } from "../../types/term";
import { Role } from "../../types/user";

registerEnumType(IsoDay, {
    name: "IsoDay",
});

registerEnumType(SessionType, {
    name: "SessionType",
});

registerEnumType(TermType, {
    name: "TermType",
});

registerEnumType(Role, {
    name: "Role",
});

export { Course } from "./Course";
export { CourseStaff } from "./CourseStaff";
export { Preference } from "./Preference";
export { Session } from "./Session";
export { SessionStream } from "./SessionStream";
export { SessionAllocation } from "./SessionAllocation";
export { StaffRequest } from "./StaffRequest";
export { StreamAllocation } from "./StreamAllocation";
export { Term } from "./Term";
export { Timetable } from "./Timetable";
export { User } from "./User";
