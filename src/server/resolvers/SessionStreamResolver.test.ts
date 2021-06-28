import { Connection } from "typeorm";
import { connect } from "../test-utils/connect";
import { seed } from "../test-utils/seed";
import { graphql } from "../test-utils/graphql";
import { jerryCraig, joeCraig, marvinNguyen } from "../test-utils/test-users";
import { IsoDay } from "../../types/date";
import { SessionStream } from "../entities";

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

const simpleAddMergedSessionStreamsMutation = `mutation {
  addMergedSessionStreams (
    sessionStreams: [
      {
        name: "P100 Flexible"
        day: 2 
        startTime: 8
        endTime: 10
        type: PRACTICAL
        location: "50-S203"
        numberOfTutorsForWeeks: [
          {
            numberOfTutors: 4
            week: 2
          }
          {
            numberOfTutors: 4
            week: 3
          }
          {
            numberOfTutors: 4
            week: 4
          }
        ]
        courseId: "0a2e6669-f8aa-45e9-8aeb-7a92ed495871"
        termId: "6a27f0f9-2c6c-478e-8088-ec7eb221a60d"
      }
    ]
  ){
    name
    startTime
    endTime
    day
    weeks
    location
    type
    numberOfStaff
  }
}
`;

describe("Test Session Stream", () => {
    test("valid addMergedSessionStreams mutation", async () => {
        const createdStreams = await graphql({
            source: simpleAddMergedSessionStreamsMutation,
            user: await marvinNguyen(),
        });
        expect(createdStreams.data).toEqual({
            addMergedSessionStreams: [
                {
                    name: "P100 Flexible",
                    day: IsoDay.TUE,
                    startTime: 8,
                    endTime: 10,
                    type: "PRACTICAL",
                    location: "50-S203",
                    numberOfStaff: 4,
                    weeks: [2, 3, 4],
                },
            ],
        });
    });

    test("unauthorised addMergedSessionStream mutation", async () => {
        const result1 = await graphql({
            source: simpleAddMergedSessionStreamsMutation,
            user: await joeCraig(),
        });
        const result2 = await graphql({
            source: simpleAddMergedSessionStreamsMutation,
            user: await jerryCraig(),
        });
        expect(result1.data).toBeNull();
        expect(result1.errors).not.toBeNull();
        expect(result2.data).toBeNull();
        expect(result2.errors).not.toBeNull();
        expect(
            await SessionStream.findOne({ name: "P100 Flexible" })
        ).toBeUndefined();
    });
});
