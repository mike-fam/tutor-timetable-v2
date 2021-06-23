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
import { User } from "../entities";

interface Options {
    source: string;
    variableValues?: Maybe<{ [key: string]: any }>;
    user: User;
}

export const graphql = async ({ source, variableValues, user }: Options) => {
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
        },
    });
};
