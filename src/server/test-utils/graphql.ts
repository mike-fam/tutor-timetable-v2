import { graphql as graphqlCall } from "graphql";
import { buildSchema } from "type-graphql";
import { AvailabilityResolver } from "../resolvers/AvailabilityResolver";
import { HelloResolver } from "../resolvers/HelloResolver";
import { UserResolver } from "../resolvers/UserResolver";
import { TermResolver } from "../resolvers/TermResolver";
import { CourseResolver } from "../resolvers/CourseResolver";
import { CourseStaffResolver } from "../resolvers/CourseStaffResolver";
import { SessionStreamResolver } from "../resolvers/SessionStreamResolver";
import { TimetableResolver } from "../resolvers/TimetableResolver";
import { SessionResolver } from "../resolvers/SessionResolver";
import { PreferenceResolver } from "../resolvers/PreferenceResolver";
import { StaffRequestResolver } from "../resolvers/StaffRequestResolver";
import { AllocatorResolver } from "../resolvers/AllocatorResolver";
import { OfferResolver } from "../resolvers/OfferResolver";
import { UserSettingsResolver } from "../resolvers/UserSettingsResolver";
import { MyContext } from "../types/context";
import { Maybe } from "graphql/jsutils/Maybe";
import {
    Course,
    CourseStaff,
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
import { CourseModel } from "../models/CourseModel";
import { CourseStaffModel } from "../models/CourseStaffModel";
import { OfferModel } from "../models/OfferModel";
import { PreferenceModel } from "../models/PreferenceModel";
import { SessionModel } from "../models/SessionModel";
import { StaffRequestModel } from "../models/StaffRequestModel";
import { SessionStreamModel } from "../models/SessionStreamModel";
import { TermModel } from "../models/TermModel";
import { TimeslotModel } from "../models/TimeslotModel";
import { TimetableModel } from "../models/TimetableModel";
import { UserModel } from "../models/UserModel";
import { UserSettingsModel } from "../models/UserSettingsModel";
import { createLoader } from "../dataloaders/createLoader";
import { Utils } from "../utils/Util";

interface Options {
    source: string;
    variableValues?: Maybe<{ [key: string]: any }>;
    user: User;
}

export const graphql = async ({ source, variableValues, user }: Options) => {
    const loaders = {
        course: createLoader(Course),
        courseStaff: createLoader(CourseStaff),
        offer: createLoader(Offer),
        preference: createLoader(Preference),
        session: createLoader(Session),
        staffRequest: createLoader(StaffRequest),
        sessionStream: createLoader(SessionStream),
        term: createLoader(Term),
        timeslot: createLoader(Timeslot),
        timetable: createLoader(Timetable),
        user: createLoader(User),
        userSettings: createLoader(UserSettings),
    };
    Utils.loaders = loaders;
    return graphqlCall({
        schema: await buildSchema({
            resolvers: [
                AvailabilityResolver,
                HelloResolver,
                UserResolver,
                TermResolver,
                CourseResolver,
                CourseStaffResolver,
                SessionStreamResolver,
                TimetableResolver,
                SessionResolver,
                PreferenceResolver,
                StaffRequestResolver,
                AllocatorResolver,
                OfferResolver,
                UserSettingsResolver,
            ],
            authChecker: ({ context: { req } }: { context: MyContext }) =>
                !!req.user,
        }),
        source,
        variableValues,
        contextValue: {
            req: {
                user,
            },
            loaders,
            models: {
                course: new CourseModel(loaders),
                courseStaff: new CourseStaffModel(loaders),
                offer: new OfferModel(loaders),
                preference: new PreferenceModel(loaders),
                session: new SessionModel(loaders),
                staffRequest: new StaffRequestModel(loaders),
                sessionStream: new SessionStreamModel(loaders),
                term: new TermModel(loaders),
                timeslot: new TimeslotModel(loaders),
                timetable: new TimetableModel(loaders),
                user: new UserModel(loaders),
                userSettings: new UserSettingsModel(loaders),
            },
        },
    });
};
