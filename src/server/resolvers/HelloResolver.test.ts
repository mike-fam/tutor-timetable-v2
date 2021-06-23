import { graphql } from "../test-utils/graphql";
import { marvinNguyen } from "../test-utils/test-users";
import { Connection } from "typeorm";
import { connect } from "../test-utils/connect";

let conn: Connection;
beforeAll(async () => {
    conn = await connect();
});

afterAll(async () => {
    await conn.close();
});

const helloQuery = `
query Hello {
    hello
}
`;

describe("Test hello resolver", () => {
    test("Hello query", async () => {
        const result = await graphql({
            source: helloQuery,
            user: await marvinNguyen(),
        });
        expect(result.data).toEqual({ hello: "Hello world" });
    });
});
