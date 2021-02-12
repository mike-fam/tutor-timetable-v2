import { ConnectionOptions } from "typeorm";
import { __prod__ } from "../constants";
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

export default {
    type: "postgres",
    url: process.env.DB_URL,
    entities: [
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
    ],
    migrations: [
        __prod__
            ? "build/server/migrations/*.js"
            : "src/server/migrations/*.ts",
    ],
    logging: false && !__prod__ && ["error", "schema", "warn", "query"],
    cli: {
        migrationsDir: __prod__
            ? "build/server/migrations/*.js"
            : "src/server/migrations",
    },
} as ConnectionOptions;
