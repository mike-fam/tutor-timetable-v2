import { registerEnumType } from "type-graphql";
import { SessionType } from "../types/session";
import { TermType } from "../types/term";
import { Role } from "../types/user";
import { RequestStatus, RequestType } from "../types/request";
import {
    AllocationStatus,
    AllocationType,
} from "../resolvers/AllocatorResolver";
import { OfferStatus } from "../types/offer";
import { FreezeState } from "../types/timetable";

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

registerEnumType(OfferStatus, {
    name: "OfferStatus",
});

registerEnumType(AllocationType, {
    name: "AllocationType",
});

registerEnumType(AllocationStatus, {
    name: "AllocationStatus",
});

registerEnumType(FreezeState, {
    name: "FreezeState",
});

export { Course } from "./Course";
export { CourseStaff } from "./CourseStaff";
export { Offer } from "./Offer";
export { Preference } from "./Preference";
export { Session } from "./Session";
export { SessionAllocation } from "./SessionAllocation";
export { SessionStream } from "./SessionStream";
export { StaffRequest } from "./StaffRequest";
export { StreamAllocation } from "./StreamAllocation";
export { Term } from "./Term";
export { Timetable } from "./Timetable";
export { Timeslot } from "./Timeslot";
export { User } from "./User";
export { UserSettings } from "./UserSettings";
