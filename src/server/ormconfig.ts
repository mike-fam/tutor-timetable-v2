import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import { __prod__ } from "../constants";
import { User } from "./entities/User";

dotenv.config();

export default {
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: __prod__,
    entities: [User],
    migrations: ["src/server/migrations/*.[jt]s"],
    logging: __prod__,
    cli: {
        migrationsDir: "src/server/migrations",
    },
} as ConnectionOptions;
