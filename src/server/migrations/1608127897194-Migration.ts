import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1608127897194 implements MigrationInterface {
    name = 'Migration1608127897194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "code" character varying(9) NOT NULL, "title" character varying(9) NOT NULL, CONSTRAINT "UQ_5cf4963ae12285cda6432d5a3a4" UNIQUE ("code"), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "term" ("id" SERIAL NOT NULL, "type" character varying(20) NOT NULL, "year" character varying(100) NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "breakWeeks" integer array NOT NULL, CONSTRAINT "PK_55b0479f0743f2e5d5ec414821e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session_allocation" ("id" SERIAL NOT NULL, "sessionId" integer, "userUsername" character varying(9), CONSTRAINT "UQ_a57b720b4d9d989b91a9fb1f241" UNIQUE ("sessionId", "userUsername"), CONSTRAINT "PK_52c1e1b8d5dfae4448fb5c0d122" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staff_request" ("id" SERIAL NOT NULL, "requesterUsername" character varying(9), "acceptorUsername" character varying(9), "finaliserUsername" character varying(9), "sessionId" integer, CONSTRAINT "UQ_85376d783da9d0c9a24513d5161" UNIQUE ("requesterUsername", "sessionId"), CONSTRAINT "PK_41bbafca9644c0f2bc09534df6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "location" character varying(15) NOT NULL, "week" integer NOT NULL, "sessionStreamId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stream_allocation" ("id" SERIAL NOT NULL, "sessionStreamId" integer, "userUsername" character varying(9), CONSTRAINT "UQ_e0f753fbcf55efaeb177c7640d1" UNIQUE ("sessionStreamId", "userUsername"), CONSTRAINT "PK_8ec85fd9f1f15f195b27a532dd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session_stream" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "type" character varying(15) NOT NULL, "day" integer NOT NULL, "startTime" double precision NOT NULL, "endTime" double precision NOT NULL, "weeks" integer array NOT NULL, "location" character varying(15) NOT NULL, "timetableId" integer, CONSTRAINT "CHK_41bbf7adf43d7d31af71faabf7" CHECK ("day" = 1 OR "day" = 2 OR "day" = 3 OR "day" = 4 OR "day" = 5 OR "day" = 6 OR "day" = 7), CONSTRAINT "CHK_547b21ea1dbf8d0c351c1177c4" CHECK ("type" = 'Practical' OR "type" = 'Tutorial' OR "type" = 'Seminar' OR "type" = 'Lecture' OR "type" = 'Studio'), CONSTRAINT "PK_4c05a74aa4bcb6232e597f6be83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "timetable" ("id" SERIAL NOT NULL, "courseId" integer, "termId" integer, CONSTRAINT "PK_06001d91b3fe346fb1387ad1a15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "preference" ("id" SERIAL NOT NULL, "sessionType" character varying(15) NOT NULL, "maxContigHours" integer NOT NULL, "maxWeeklyHours" integer NOT NULL, CONSTRAINT "CHK_048b5ceb22fa1888c5c49d0139" CHECK ("sessionType" = 'Practical' OR "sessionType" = 'Tutorial' OR "sessionType" = 'Seminar' OR "sessionType" = 'Lecture' OR "sessionType" = 'Studio'), CONSTRAINT "PK_5c4cbf49a1e97dcbc695bf462a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_staff" ("id" SERIAL NOT NULL, "timetableId" integer, "userUsername" character varying(9), "preferenceId" integer, CONSTRAINT "UQ_d21e1184e13eb8575434702a981" UNIQUE ("timetableId", "userUsername"), CONSTRAINT "REL_d3dfdd3bab57eedfcf1e45bc72" UNIQUE ("preferenceId"), CONSTRAINT "PK_6bc9388e2bf79cf6de4678dc81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "FK_4229fc0a3545c3afd0bfb0bb7e4" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "FK_595f7a3c6b18c8ecca60869a317" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_cbd4772d28e3c5f2ed313e96a5b" FOREIGN KEY ("requesterUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_4127d3a2fc0af57ea9c6566b99e" FOREIGN KEY ("acceptorUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_5be657be2600512ce71a1713fe5" FOREIGN KEY ("finaliserUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_0f5d437fc98264cfb98dafdf080" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_e18308596f3076e9de1d80c6f51" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" ADD CONSTRAINT "FK_b3d5528826d766b691e1132107f" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" ADD CONSTRAINT "FK_05cd74fe1cb253f828732ff2db3" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_stream" ADD CONSTRAINT "FK_66028ae4744099f055d7763a503" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "timetable" ADD CONSTRAINT "FK_9cc6b2c53c23571cad8390666f4" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "timetable" ADD CONSTRAINT "FK_531f53d06003b9e25ed9f2f0cd3" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "FK_2f8044368c327e2ad804dc1fe56" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "FK_5e804e5a1f9d76913e106905776" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "FK_d3dfdd3bab57eedfcf1e45bc72d" FOREIGN KEY ("preferenceId") REFERENCES "preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "FK_d3dfdd3bab57eedfcf1e45bc72d"`);
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "FK_5e804e5a1f9d76913e106905776"`);
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "FK_2f8044368c327e2ad804dc1fe56"`);
        await queryRunner.query(`ALTER TABLE "timetable" DROP CONSTRAINT "FK_531f53d06003b9e25ed9f2f0cd3"`);
        await queryRunner.query(`ALTER TABLE "timetable" DROP CONSTRAINT "FK_9cc6b2c53c23571cad8390666f4"`);
        await queryRunner.query(`ALTER TABLE "session_stream" DROP CONSTRAINT "FK_66028ae4744099f055d7763a503"`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" DROP CONSTRAINT "FK_05cd74fe1cb253f828732ff2db3"`);
        await queryRunner.query(`ALTER TABLE "stream_allocation" DROP CONSTRAINT "FK_b3d5528826d766b691e1132107f"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_e18308596f3076e9de1d80c6f51"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_0f5d437fc98264cfb98dafdf080"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_5be657be2600512ce71a1713fe5"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_4127d3a2fc0af57ea9c6566b99e"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_cbd4772d28e3c5f2ed313e96a5b"`);
        await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "FK_595f7a3c6b18c8ecca60869a317"`);
        await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "FK_4229fc0a3545c3afd0bfb0bb7e4"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "course_staff"`);
        await queryRunner.query(`DROP TABLE "preference"`);
        await queryRunner.query(`DROP TABLE "timetable"`);
        await queryRunner.query(`DROP TABLE "session_stream"`);
        await queryRunner.query(`DROP TABLE "stream_allocation"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "staff_request"`);
        await queryRunner.query(`DROP TABLE "session_allocation"`);
        await queryRunner.query(`DROP TABLE "term"`);
        await queryRunner.query(`DROP TABLE "course"`);
    }

}
