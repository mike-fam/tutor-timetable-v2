import DataLoader from "dataloader";
import {
    Course,
    CourseStaff,
    Notification,
    Offer,
    Preference,
    Session,
    SessionStream,
    StaffRequest,
    Term,
    Timeslot,
    Timetable,
    User,
    UserSettings,
} from "../entities";

export type CourseLoader = DataLoader<string, Course>;
export type CourseStaffLoader = DataLoader<string, CourseStaff>;
export type NotificationLoader = DataLoader<string, Notification>;
export type OfferLoader = DataLoader<string, Offer>;
export type PreferenceLoader = DataLoader<string, Preference>;
export type SessionLoader = DataLoader<string, Session>;
export type SessionStreamLoader = DataLoader<string, SessionStream>;
export type StaffRequestLoader = DataLoader<string, StaffRequest>;
export type TermLoader = DataLoader<string, Term>;
export type TimeslotLoader = DataLoader<string, Timeslot>;
export type TimetableLoader = DataLoader<string, Timetable>;
export type UserLoader = DataLoader<string, User>;
export type UserSettingsLoader = DataLoader<string, UserSettings>;

export type DataLoaders = {
    course: CourseLoader;
    courseStaff: CourseStaffLoader;
    notification: NotificationLoader;
    offer: OfferLoader;
    preference: PreferenceLoader;
    session: SessionLoader;
    sessionStream: SessionStreamLoader;
    staffRequest: StaffRequestLoader;
    term: TermLoader;
    timeslot: TimeslotLoader;
    timetable: TimetableLoader;
    user: UserLoader;
    userSettings: UserSettingsLoader;
};

export type DataLoaderKey = keyof DataLoaders;
