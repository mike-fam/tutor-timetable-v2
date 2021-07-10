import { CourseModel } from "../models/CourseModel";
import { UserModel } from "../models/UserModel";
import { StaffRequestModel } from "../models/StaffRequestModel";
import { UserSettingsModel } from "../models/UserSettingsModel";
import { TimeslotModel } from "../models/TimeslotModel";
import { SessionModel } from "../models/SessionModel";
import { CourseStaffModel } from "../models/CourseStaffModel";
import { OfferModel } from "../models/OfferModel";
import { SessionStreamModel } from "../models/SessionStreamModel";
import { TimetableModel } from "../models/TimetableModel";
import { PreferenceModel } from "../models/PreferenceModel";
import { TermModel } from "../models/TermModel";
import { NotificationModel } from "../models/NotificationModel";

export type Models = {
    course: CourseModel;
    courseStaff: CourseStaffModel;
    notification: NotificationModel;
    offer: OfferModel;
    preference: PreferenceModel;
    session: SessionModel;
    sessionStream: SessionStreamModel;
    staffRequest: StaffRequestModel;
    term: TermModel;
    timeslot: TimeslotModel;
    timetable: TimetableModel;
    user: UserModel;
    userSettings: UserSettingsModel;
};
