import { Resolver } from "type-graphql";
import { Service } from "typedi";
import { UserModel } from "../models/UserModel";
import { TimetableModel } from "../models/TimetableModel";
import { CourseModel } from "../models/CourseModel";
import { CourseStaffModel } from "../models/CourseStaffModel";
import { OfferModel } from "../models/OfferModel";
import { PreferenceModel } from "../models/PreferenceModel";
import { SessionModel } from "../models/SessionModel";
import { SessionStreamModel } from "../models/SessionStreamModel";
import { StaffRequestModel } from "../models/StaffRequestModel";
import { TermModel } from "../models/TermModel";
import { TimeslotModel } from "../models/TimeslotModel";
import { UserSettingsModel } from "../models/UserSettingsModel";

@Service()
@Resolver({ isAbstract: true })
export abstract class EntityResolver {
    public constructor(
        protected courseModel: CourseModel,
        protected courseStaffModel: CourseStaffModel,
        protected offerModel: OfferModel,
        protected preferenceModel: PreferenceModel,
        protected sessionModel: SessionModel,
        protected sessionStreamModel: SessionStreamModel,
        protected staffRequestModel: StaffRequestModel,
        protected termModel: TermModel,
        protected timeslotModel: TimeslotModel,
        protected timetableModel: TimetableModel,
        protected userModel: UserModel,
        protected userSettingsModel: UserSettingsModel
    ) {}
}
