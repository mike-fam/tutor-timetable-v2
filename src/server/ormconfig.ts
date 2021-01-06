import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import { __prod__ } from "../constants";
import {
    Course,
    CourseStaff,
    Preference,
    Session,
    SessionAllocation,
    SessionStream,
    StaffRequest,
    StreamAllocation,
    Term,
    Timetable,
    User,
} from "./entities";

dotenv.config();

export default {
    type: "postgres",
    url: process.env.DB_URL,
    entities: [
        Course,
        CourseStaff,
        Preference,
        Session,
        SessionAllocation,
        SessionStream,
        StaffRequest,
        StreamAllocation,
        Term,
        Timetable,
        User,
    ],
    migrations: [
        __prod__
            ? "build/server/migrations/*.js"
            : "src/server/migrations/*.ts",
    ],
    logging: !__prod__ && ["error", "schema", "warn", "query"],
    cli: {
        migrationsDir: "src/server/migrations",
    },
} as ConnectionOptions;
