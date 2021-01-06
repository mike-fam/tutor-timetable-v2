import { registerEnumType } from "type-graphql";
import { SessionType } from "../../types/session";
import { TermType } from "../../types/term";
import { Role } from "../../types/user";
import { RequestStatus, RequestType } from "../../types/request";

registerEnumType(SessionType, {
    name: "SessionType",
});

registerEnumType(TermType, {
    name: "TermType",
});

registerEnumType(Role, {
    name: "Role",
});

registerEnumType(RequestType, {
    name: "RequestType",
});

registerEnumType(RequestStatus, {
    name: "RequestStatus",
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
