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
    migrations: ["build/server/migrations/*.js"],
    logging: !__prod__,
    cli: {
        migrationsDir: "src/server/migrations",
    },
} as ConnectionOptions;
