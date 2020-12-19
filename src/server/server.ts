import "reflect-metadata";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import ormconfig from "./ormconfig";
import { HelloResolver } from "./resolvers/HelloResolver";
import asyncHandler from "express-async-handler";
import { uqAuthMiddleware } from "./auth/uqAuthMiddleware";
import { User } from "./entities/User";
import { MyContext } from "../types/context";
import { UserResolver } from "./resolvers/UserResolver";
import { TermResolver } from "./resolvers/TermResolver";

dotenv.config();

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}
const main = async () => {
    await createConnection(ormconfig);
    const app: Express = express();
    const server = createServer(app);
    const port = process.env.PORT || 5000;

    // Automatically serve the index.html file from the build folder
    app.set("trust proxy", "loopback");
    app.use("/", express.static("build/client"));

    app.get("/hello", (_, res) => {
        res.json({ test: "Hello world" });
    });

    app.use(asyncHandler(uqAuthMiddleware));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, UserResolver, TermResolver],
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
    // console.error(err);
    // console.error(err.details);
});
