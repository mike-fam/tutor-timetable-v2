import express, { Express } from "express";
import { createServer } from "http";

const main = async () => {
    const app: Express = express();
    const server = createServer(app);
    const port = process.env.PORT || 5000;

    app.get("/hello", (req, res) => {
        res.json({ test: "Hello world" });
    });

    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

main();
