import DataLoader from "dataloader";
import {
    Course,
    CourseStaff,
    Offer,
    Preference,
    Session,
    SessionAllocation,
    SessionStream,
    StaffRequest,
    StreamAllocation,
    Term,
    Timeslot,
    Timetable,
    User,
    UserSettings,
} from "../entities";

export type CourseLoader = DataLoader<string, Course>;
export type CourseStaffLoader = DataLoader<string, CourseStaff>;
export type OfferLoader = DataLoader<string, Offer>;
export type PreferenceLoader = DataLoader<string, Preference>;
export type SessionLoader = DataLoader<string, Session>;
export type SessionAllocationLoader = DataLoader<string, SessionAllocation>;
export type SessionStreamLoader = DataLoader<string, SessionStream>;
export type StaffRequestLoader = DataLoader<string, StaffRequest>;
export type StreamAllocationLoader = DataLoader<string, StreamAllocation>;
export type TermLoader = DataLoader<string, Term>;
export type TimeslotLoader = DataLoader<string, Timeslot>;
export type TimetableLoader = DataLoader<string, Timetable>;
export type UserLoader = DataLoader<string, User>;
export type UserSettingsLoader = DataLoader<string, UserSettings>;

export type DataLoaders = {
    course: CourseLoader;
    courseStaff: CourseStaffLoader;
    offer: OfferLoader;
    preference: PreferenceLoader;
    session: SessionLoader;
    sessionAllocation: SessionAllocationLoader;
    sessionStream: SessionStreamLoader;
    staffRequest: StaffRequestLoader;
    streamAllocation: StreamAllocationLoader;
    term: TermLoader;
    timeslot: TimeslotLoader;
    timetable: TimetableLoader;
    user: UserLoader;
    userSettings: UserSettingsLoader;
};

export type DataLoaderKey = keyof DataLoaders;
