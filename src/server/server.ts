import "reflect-metadata";
import "./config";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import ormconfig from "./ormconfig";
import { HelloResolver } from "./resolvers/HelloResolver";
import asyncHandler from "express-async-handler";
import { uqAuthMiddleware } from "./auth/uqAuthMiddleware";
import { MyContext } from "../types/context";
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

    app.get("/hello", (_, res) => {
        res.json({ test: "Hello world" });
    });

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
            ],
            dateScalarMode: "isoDate",
        }),
        context: ({ req, res }): MyContext => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app });
    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

main().catch((err) => {
    console.error(err);
    console.error(err.details);
});
