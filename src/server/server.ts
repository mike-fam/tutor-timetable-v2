import "reflect-metadata";
import "./config";
import express, { Express, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { execute, subscribe } from "graphql";
import {
    ConnectionContext,
    SubscriptionServer,
} from "subscriptions-transport-ws";
import ormconfig from "./ormconfig";
import { HelloResolver } from "./resolvers/HelloResolver";
import asyncHandler from "express-async-handler";
import { uqAuthMiddleware } from "./auth/uqAuthMiddleware";
import { MyContext } from "./types/context";
import { UserResolver } from "./resolvers/UserResolver";
import { TermResolver } from "./resolvers/TermResolver";
import { CourseStaffResolver } from "./resolvers/CourseStaffResolver";
import cors from "cors";
import {
    SessionStreamResolver,
    StreamInput,
} from "./resolvers/SessionStreamResolver";
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
} from "./entities";
import { LoadersInjector } from "./middlewares/loaders-injection";
import { UserSettingsResolver } from "./resolvers/UserSettingsResolver";
import { CourseModel } from "./models/CourseModel";
import { UserModel } from "./models/UserModel";
import { StaffRequestModel } from "./models/StaffRequestModel";
import { UserSettingsModel } from "./models/UserSettingsModel";
import { TimeslotModel } from "./models/TimeslotModel";
import { SessionModel } from "./models/SessionModel";
import { CourseStaffModel } from "./models/CourseStaffModel";
import { OfferModel } from "./models/OfferModel";
import { SessionStreamModel } from "./models/SessionStreamModel";
import { TimetableModel } from "./models/TimetableModel";
import { PreferenceModel } from "./models/PreferenceModel";
import { TermModel } from "./models/TermModel";
import { NotificationResolver } from "./resolvers/NotificationResolver";
import { NotificationModel } from "./models/NotificationModel";
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";

const main = async () => {
    await createConnection(ormconfig);
    const app: Express = express();
    const httpServer = createServer(app);
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

    const options: Redis.RedisOptions = {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
        retryStrategy: (times) => Math.max(times * 100, 3000),
    };

    // create Redis-based pub-sub
    const pubSub = new RedisPubSub({
        publisher: new Redis(options),
        subscriber: new Redis(options),
    });

    const schema = await buildSchema({
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
            NotificationResolver,
        ],
        pubSub,
        dateScalarMode: "isoDate",
        globalMiddlewares: [LoadersInjector],
        authChecker: ({ context: { req } }: { context: MyContext }) =>
            !!req.user,
        orphanedTypes: [StreamInput],
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }): MyContext => {
            const loaders = {
                course: createLoader(Course),
                courseStaff: createLoader(CourseStaff),
                notification: createLoader(Notification),
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
            return {
                req,
                res,
                loaders,
                models: {
                    course: new CourseModel(loaders),
                    courseStaff: new CourseStaffModel(loaders),
                    notification: new NotificationModel(loaders),
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
            };
        },
        plugins: [
            {
                serverWillStart: async () => ({
                    drainServer: async () => subscriptionServer.close(),
                }),
            },
            process.env.NODE_ENV === "production" &&
            process.env.ENABLE_PLAYGROUND !== "true"
                ? ApolloServerPluginLandingPageDisabled()
                : ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
    });

    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
            // onConnect: async (
            //     connectionParams: Object,
            //     webSocket: WebSocket,
            //     context: ConnectionContext
            // ) => {
            //     console.log(context);
            // },
        },
        { server: httpServer, path: apolloServer.graphqlPath }
    );

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    // Catch-all route
    app.use("*", (_, res: Response) => {
        res.sendFile("index.html", {
            root: path.resolve("./build", "client"),
        });
    });

    httpServer.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

main().catch((err) => {
    console.error(err);
});
