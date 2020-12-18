import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import { __prod__ } from "../constants";
import { User } from "./entities/User";
import { Course } from "./entities/Course";
import { CourseStaff } from "./entities/CourseStaff";
import { Preference } from "./entities/Preference";
import { StaffRequest } from "./entities/StaffRequest";
import { Session } from "./entities/Session";
import { SessionAllocation } from "./entities/SessionAllocation";
import { SessionStream } from "./entities/SessionStream";
import { StreamAllocation } from "./entities/StreamAllocation";
import { Term } from "./entities/Term";
import { Timetable } from "./entities/Timetable";

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
