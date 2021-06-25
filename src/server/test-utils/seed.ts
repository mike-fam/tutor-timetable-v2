import fs from "fs";
import { Pool } from "pg";

// TODO: reduce test time by making a new db for every test.
export const seed = async () => {
    const pool = new Pool({
        user: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PW,
        host: process.env.TEST_DB_HOST,
        database: process.env.TEST_DB_NAME,
    });
    const query = fs
        .readFileSync(
            __dirname + "/../../../bootstrap/tutor_timetable_v2.dump",
            "utf-8"
        )
        .toString();
    pool.connect((err, client, done) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        client.query(query, (err) => {
            done();
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });
    await pool.end();
};
