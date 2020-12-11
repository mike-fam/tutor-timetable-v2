import "reflect-metadata";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { HelloResolver } from "./resolvers/HelloResolver";

dotenv.config();

const main = async () => {
    await createConnection();
    const app: Express = express();
    const server = createServer(app);
    const port = process.env.PORT || 5000;

    // Automatically serve the index.html file from the build folder
    app.set("trust proxy", "loopback");
    app.use("/", express.static("build/"));

    app.get("/hello", (_, res) => {
        res.json({ test: "Hello world" });
    });

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
        }),
    });

    apolloServer.applyMiddleware({ app });
    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

main().catch((err) => {
    console.error(err);
});
