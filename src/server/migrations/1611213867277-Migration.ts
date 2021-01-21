import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1611213867277 implements MigrationInterface {
    name = 'Migration1611213867277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "FK_595f7a3c6b18c8ecca60869a317"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_cbd4772d28e3c5f2ed313e96a5b"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_5be657be2600512ce71a1713fe5"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_4127d3a2fc0af57ea9c6566b99e"`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" DROP CONSTRAINT "FK_05cd74fe1cb253f828732ff2db3"`);
        await queryRunner.query(`ALTER TABLE "timeslot" DROP CONSTRAINT "FK_ecb27d40dfe5c9b8817210ee53f"`);
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "FK_5e804e5a1f9d76913e106905776"`);
        await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "UQ_a57b720b4d9d989b91a9fb1f241"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "UQ_85376d783da9d0c9a24513d5161"`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" DROP CONSTRAINT "UQ_e0f753fbcf55efaeb177c7640d1"`);
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "UQ_d21e1184e13eb8575434702a981"`);
        await queryRunner.query(`ALTER TABLE "session_allocation" RENAME COLUMN "userUsername" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" RENAME COLUMN "userUsername" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "timeslot" RENAME COLUMN "userUsername" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "course_staff" RENAME COLUMN "userUsername" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "acceptorUsername"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "finaliserUsername"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "requesterUsername"`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD "requesterId" integer`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD "acceptorId" integer`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD "finaliserId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_72da1f98d8d8a4f2fb77754e2e0" PRIMARY KEY ("username", "id")`);
        await queryRunner.query(`ALTER TABLE "session_allocation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "session_allocation" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "session_stream" DROP CONSTRAINT "FK_66028ae4744099f055d7763a503"`);
        await queryRunner.query(`ALTER TABLE "session_stream" ALTER COLUMN "timetableId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "session_stream"."timetableId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "timeslot" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD "userId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."username" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_72da1f98d8d8a4f2fb77754e2e0"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "course_staff" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "UQ_48fa99dd8231087c41a285f606f" UNIQUE ("sessionId", "userId")`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "UQ_3aa706a41308e3fd7107bf5d078" UNIQUE ("requesterId", "sessionId")`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" ADD CONSTRAINT "UQ_8b449413d5d44c30ffff74aa0f0" UNIQUE ("sessionStreamId", "userId")`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "UQ_f33c09ecdf4a0ee5a8a27ac971d" UNIQUE ("timetableId", "userId")`);
        await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "FK_4ad45c42f963d66b7d38b6e9fe8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_f8d9da2b83b977dcc23b6c2fc60" FOREIGN KEY ("requesterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_6e406f88ffcac36d89c6887d7be" FOREIGN KEY ("acceptorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_726c425ec6ac8e07a84332e6fbb" FOREIGN KEY ("finaliserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_stream" ADD CONSTRAINT "FK_66028ae4744099f055d7763a503" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" ADD CONSTRAINT "FK_bc7afec02062c5cedc6d14bd6af" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD CONSTRAINT "FK_47d06adf246fcfea1d318423ee3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "FK_2e099fcbb0ffe5108a4df4b31c8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "FK_2e099fcbb0ffe5108a4df4b31c8"`);
        await queryRunner.query(`ALTER TABLE "timeslot" DROP CONSTRAINT "FK_47d06adf246fcfea1d318423ee3"`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" DROP CONSTRAINT "FK_bc7afec02062c5cedc6d14bd6af"`);
        await queryRunner.query(`ALTER TABLE "session_stream" DROP CONSTRAINT "FK_66028ae4744099f055d7763a503"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_726c425ec6ac8e07a84332e6fbb"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_6e406f88ffcac36d89c6887d7be"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_f8d9da2b83b977dcc23b6c2fc60"`);
        await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "FK_4ad45c42f963d66b7d38b6e9fe8"`);
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "UQ_f33c09ecdf4a0ee5a8a27ac971d"`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" DROP CONSTRAINT "UQ_8b449413d5d44c30ffff74aa0f0"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "UQ_3aa706a41308e3fd7107bf5d078"`);
        await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "UQ_48fa99dd8231087c41a285f606f"`);
        await queryRunner.query(`ALTER TABLE "course_staff" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD "userId" character varying(9)`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_72da1f98d8d8a4f2fb77754e2e0" PRIMARY KEY ("username", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."username" IS NULL`);
        await queryRunner.query(`ALTER TABLE "timeslot" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD "userId" character varying(9)`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" ADD "userId" character varying(9)`);
        await queryRunner.query(`COMMENT ON COLUMN "session_stream"."timetableId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "session_stream" ALTER COLUMN "timetableId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session_stream" ADD CONSTRAINT "FK_66028ae4744099f055d7763a503" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_allocation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "session_allocation" ADD "userId" character varying(9)`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_72da1f98d8d8a4f2fb77754e2e0"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_78a916df40e02a9deb1c4b75edb" PRIMARY KEY ("username")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "finaliserId"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "acceptorId"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "requesterId"`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD "requesterUsername" character varying(9)`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD "finaliserUsername" character varying(9)`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD "acceptorUsername" character varying(9)`);
        await queryRunner.query(`ALTER TABLE "course_staff" RENAME COLUMN "userId" TO "userUsername"`);
        await queryRunner.query(`ALTER TABLE "timeslot" RENAME COLUMN "userId" TO "userUsername"`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" RENAME COLUMN "userId" TO "userUsername"`);
        await queryRunner.query(`ALTER TABLE "session_allocation" RENAME COLUMN "userId" TO "userUsername"`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "UQ_d21e1184e13eb8575434702a981" UNIQUE ("timetableId", "userUsername")`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" ADD CONSTRAINT "UQ_e0f753fbcf55efaeb177c7640d1" UNIQUE ("sessionStreamId", "userUsername")`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "UQ_85376d783da9d0c9a24513d5161" UNIQUE ("requesterUsername", "sessionId")`);
        await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "UQ_a57b720b4d9d989b91a9fb1f241" UNIQUE ("sessionId", "userUsername")`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "FK_5e804e5a1f9d76913e106905776" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD CONSTRAINT "FK_ecb27d40dfe5c9b8817210ee53f" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" ADD CONSTRAINT "FK_05cd74fe1cb253f828732ff2db3" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_4127d3a2fc0af57ea9c6566b99e" FOREIGN KEY ("acceptorUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_5be657be2600512ce71a1713fe5" FOREIGN KEY ("finaliserUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_cbd4772d28e3c5f2ed313e96a5b" FOREIGN KEY ("requesterUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "FK_595f7a3c6b18c8ecca60869a317" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
