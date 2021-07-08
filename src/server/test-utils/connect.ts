import "../config";
import { createConnection } from "typeorm";
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
} from "../entities";

export const connect = async () => {
    return await createConnection({
        type: "postgres",
        host: process.env.TEST_DB_HOST,
        port: 5432,
        username: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PW,
        database: process.env.TEST_DB_NAME,
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
    });
};
