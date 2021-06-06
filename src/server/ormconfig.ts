import { ConnectionOptions } from "typeorm";
import { __prod__ } from "../constants";
import {
    Course,
    CourseStaff,
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

export default {
    type: "postgres",
    url: process.env.DB_URL,
    entities: [
        Course,
        CourseStaff,
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
    ],
    migrations: [
        __prod__
            ? "build/server/migrations/*.js"
            : "src/server/migrations/*.ts",
    ],
    logging: !__prod__ && ["error", "schema", "warn", "query"],
    cli: {
        migrationsDir: __prod__
            ? "build/server/migrations/*.js"
            : "src/server/migrations",
    },
} as ConnectionOptions;
