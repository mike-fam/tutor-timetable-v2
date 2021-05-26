import "reflect-metadata";
import "./config";
import express, { Express, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import ormconfig from "./ormconfig";
import { HelloResolver } from "./resolvers/HelloResolver";
import asyncHandler from "express-async-handler";
import { uqAuthMiddleware } from "./auth/uqAuthMiddleware";
import { MyContext } from "./types/context";
import { UserResolver } from "./resolvers/UserResolver";
import { TermResolver } from "./resolvers/TermResolver";
import { CourseStaffResolver } from "./resolvers/CourseStaffResolver";
import cors from "cors";
import { SessionStreamResolver } from "./resolvers/SessionStreamResolver";
import { TimetableResolver } from "./resolvers/TimetableResolver";
import { SessionResolver } from "./resolvers/SessionResolver";
import { AvailabilityResolver } from "./resolvers/AvailabilityResolver";
import { PreferenceResolver } from "./resolvers/PreferenceResolver";
import { AllocatorResolver } from "./resolvers/AllocatorResolver";
import { StaffRequestResolver } from "./resolvers/StaffRequestResolver";
import { CourseResolver } from "./resolvers/CourseResolver";
import { OfferResolver } from "./resolvers/OfferResolver";
import * as path from "path";
import { createLoader } from "./dataloaders/createLoader";
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
} from "./entities";
import { UserSettings } from "./entities/UserSettings";

const main = async () => {
    await createConnection(ormconfig);
    const app: Express = express();
    const server = createServer(app);
    const port = process.env.PORT || 5000;

    // Automatically serve the index.html file from the build folder
    app.set("trust proxy", "loopback");
    app.use(
        cors({
            credentials: true,
            origin: process.env.CORS_ORIGIN,
        })
    );
    app.use("/", express.static("build/client"));

    app.use(asyncHandler(uqAuthMiddleware));

    const apolloServer = new ApolloServer({
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
            ],
            dateScalarMode: "isoDate",
        }),
        context: ({ req, res }): MyContext => ({
            req,
            res,
            loaders: {
                course: createLoader(Course),
                courseStaff: createLoader(CourseStaff),
                offer: createLoader(Offer),
                preference: createLoader(Preference),
                session: createLoader(Session),
                sessionAllocation: createLoader(SessionAllocation),
                sessionStream: createLoader(SessionStream),
                staffRequest: createLoader(StaffRequest),
                streamAllocation: createLoader(StreamAllocation),
                term: createLoader(Term),
                timeslot: createLoader(Timeslot),
                timetable: createLoader(Timetable),
                user: createLoader(User),
                userSettings: createLoader(UserSettings),
            },
        }),
    });

    apolloServer.applyMiddleware({ app });

    // Catch-all route
    app.use("*", (_, res: Response) => {
        res.sendFile("index.html", {
            root: path.resolve("./build", "client"),
        });
    });

    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    console.log(await Course.find());
};

main().catch((err) => {
    console.error(err);
    console.error(err.details);
});
