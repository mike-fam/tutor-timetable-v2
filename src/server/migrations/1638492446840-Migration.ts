import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1638492446840 implements MigrationInterface {
    name = 'Migration1638492446840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "FK_d3dfdd3bab57eedfcf1e45bc72d"`);
        await queryRunner.query(`ALTER TABLE "offer_preferences_session" DROP CONSTRAINT "FK_971f3356e937e94d7c26d27d15a"`);
        await queryRunner.query(`ALTER TABLE "offer_preferences_session" DROP CONSTRAINT "FK_3a098cb4f1707a4d217954cfab9"`);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" DROP CONSTRAINT "FK_c13a3a9d35ffb7497f0a93cb570"`);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" DROP CONSTRAINT "FK_9159aa0df8131c1cd0f242c84dc"`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" DROP CONSTRAINT "FK_37f7a2c9293d636e7b3c1b0482e"`);
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" DROP CONSTRAINT "FK_3e1a73101620f738bc61dffa195"`);
        // await queryRunner.query(`ALTER TABLE "user_settings" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "UQ_d3dfdd3bab57eedfcf1e45bc72d"`);
        await queryRunner.query(`ALTER TABLE "course_staff" DROP COLUMN "preferenceId"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "courseStaffId"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "courseStaffId" uuid`);
        await queryRunner.query(`ALTER TABLE "preference" ADD CONSTRAINT "UQ_bb2583a46037ff9e3acba0c545b" UNIQUE ("courseStaffId")`);
        await queryRunner.query(`ALTER TABLE "preference" ADD CONSTRAINT "FK_bb2583a46037ff9e3acba0c545b" FOREIGN KEY ("courseStaffId") REFERENCES "course_staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer_preferences_session" ADD CONSTRAINT "FK_971f3356e937e94d7c26d27d15a" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "offer_preferences_session" ADD CONSTRAINT "FK_3a098cb4f1707a4d217954cfab9" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" ADD CONSTRAINT "FK_9159aa0df8131c1cd0f242c84dc" FOREIGN KEY ("staffRequestId") REFERENCES "staff_request"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" ADD CONSTRAINT "FK_c13a3a9d35ffb7497f0a93cb570" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" ADD CONSTRAINT "FK_37f7a2c9293d636e7b3c1b0482e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" ADD CONSTRAINT "FK_3e1a73101620f738bc61dffa195" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" DROP CONSTRAINT "FK_3e1a73101620f738bc61dffa195"`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" DROP CONSTRAINT "FK_37f7a2c9293d636e7b3c1b0482e"`);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" DROP CONSTRAINT "FK_c13a3a9d35ffb7497f0a93cb570"`);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" DROP CONSTRAINT "FK_9159aa0df8131c1cd0f242c84dc"`);
        await queryRunner.query(`ALTER TABLE "offer_preferences_session" DROP CONSTRAINT "FK_3a098cb4f1707a4d217954cfab9"`);
        await queryRunner.query(`ALTER TABLE "offer_preferences_session" DROP CONSTRAINT "FK_971f3356e937e94d7c26d27d15a"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP CONSTRAINT "FK_bb2583a46037ff9e3acba0c545b"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP CONSTRAINT "UQ_bb2583a46037ff9e3acba0c545b"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "courseStaffId"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "courseStaffId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD "preferenceId" uuid`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "UQ_d3dfdd3bab57eedfcf1e45bc72d" UNIQUE ("preferenceId")`);
        // await queryRunner.query(`ALTER TABLE "user_settings" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" ADD CONSTRAINT "FK_3e1a73101620f738bc61dffa195" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" ADD CONSTRAINT "FK_37f7a2c9293d636e7b3c1b0482e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" ADD CONSTRAINT "FK_9159aa0df8131c1cd0f242c84dc" FOREIGN KEY ("staffRequestId") REFERENCES "staff_request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" ADD CONSTRAINT "FK_c13a3a9d35ffb7497f0a93cb570" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer_preferences_session" ADD CONSTRAINT "FK_3a098cb4f1707a4d217954cfab9" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer_preferences_session" ADD CONSTRAINT "FK_971f3356e937e94d7c26d27d15a" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "FK_d3dfdd3bab57eedfcf1e45bc72d" FOREIGN KEY ("preferenceId") REFERENCES "preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
