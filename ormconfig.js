const path = require("path");

const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, "src/server/entities/*.ts")],
    migrations: [path.join(__dirname, "src/server/migrations/*.ts")],
    cli: {
        migrationsDir: "src/server/migrations",
    },
};
