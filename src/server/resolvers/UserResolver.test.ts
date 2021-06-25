import { Connection } from "typeorm";
import { connect } from "../test-utils/connect";
import { seed } from "../test-utils/seed";
import { graphql } from "../test-utils/graphql";
import { marvinNguyen } from "../test-utils/test-users";

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

const meQuery = `
query Me {
    me {
        username
        name
        email
    }
}
`;

describe("Test User Resolver", () => {
    test("me query", async () => {
        const me = await graphql({
            source: meQuery,
            user: await marvinNguyen(),
        });
        expect(me.data).toEqual({
            me: {
                username: "uqmnguy",
                name: "Marvin Nguyen",
                email: "marvin.nguyen@example.com",
            },
        });
    });
});
