import { Connection } from "typeorm";
import { connect } from "../test-utils/connect";
import { seed } from "../test-utils/seed";
import { User } from "../entities";

let conn: Connection;
beforeAll(async () => {
    conn = await connect();
});

afterAll(async () => {
    await conn.close();
});

beforeEach(async () => {
    await seed();
});

describe("Test", () => {
    test("get users", async () => {
        const users = await User.find();
        expect(users.length).toBe(51);
    });
});
