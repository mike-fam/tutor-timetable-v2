import { Connection } from "typeorm";
import { connect } from "../test-utils/connect";
import { seed } from "../test-utils/seed";
import { graphql } from "../test-utils/graphql";
import { marvinNguyen } from "../test-utils/test-users";
import { IsoDay } from "../../types/date";

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
    id
    name
    startTime
    endTime
    day
    weeks
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
        expect(createdStreams.data).toEqual([
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
        ]);
    });
});
