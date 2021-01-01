import { registerEnumType } from "type-graphql";
import { IsoDay } from "../../types/date";
import { SessionType } from "../../types/session";
import { Role } from "../../types/user";

registerEnumType(IsoDay, {
    name: "IsoDay",
});

registerEnumType(SessionType, {
    name: "SessionType",
});

registerEnumType(Role, {
    name: "Role",
});

export { Course } from "./Course";
export { CourseStaff } from "./CourseStaff";
export { Preference } from "./Preference";
export { Session } from "./Session";
export { SessionAllocation } from "./SessionAllocation";
export { SessionStream } from "./SessionStream";
export { StaffRequest } from "./StaffRequest";
export { StreamAllocation } from "./StreamAllocation";
export { Term } from "./Term";
export { Timetable } from "./Timetable";
export { User } from "./User";
