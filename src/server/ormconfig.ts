import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import { __prod__ } from "../constants";
import { Hello } from "./entities/Hello";
import { User } from "./entities/User";

dotenv.config();

export default {
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: __prod__,
    entities: [Hello, User],
    migrations: ["./migrations/*.[jt]s"],
    logging: __prod__,
    cli: {
        migrationsDir: "migrations",
    },
} as ConnectionOptions;
