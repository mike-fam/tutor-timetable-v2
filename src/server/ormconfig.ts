import { DataSource } from "typeorm";
import { __prod__ } from "../constants";
import {
    Course,
    CourseStaff,
    Notification,
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

export const dataSource = new DataSource({
    type: "postgres",
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PW,
    port: Number(process.env.DB_PORT) || 5432,
    entities: [
        Course,
        CourseStaff,
        Notification,
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
    // Uncomment query if you want to see the queries run by TypeORM
    // Warning: your might be overwhelmed by the output
    logging: !__prod__ && ["error", "schema", "warn"], //, "query"],
    // migrationsRun: true,
});
