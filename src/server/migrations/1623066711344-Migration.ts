import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1623066711344 implements MigrationInterface {
    name = 'Migration1623066711344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session_stream_allocated_users_user" ("sessionStreamId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_4ac2d5c51b2a40fab3d090c5d4d" PRIMARY KEY ("sessionStreamId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e62630c379f91fe30d920b3462" ON "session_stream_allocated_users_user" ("sessionStreamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_76fe690bd48a4cd9aa58bfcb45" ON "session_stream_allocated_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_allocated_sessions_session" ("userId" uuid NOT NULL, "sessionId" uuid NOT NULL, CONSTRAINT "PK_b4c4846f1e9b406a1097621fec1" PRIMARY KEY ("userId", "sessionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37f7a2c9293d636e7b3c1b0482" ON "user_allocated_sessions_session" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0285bd5e90495ffd4540a213be" ON "user_allocated_sessions_session" ("sessionId") `);
        await queryRunner.query(`CREATE TABLE "user_allocated_streams_session_stream" ("userId" uuid NOT NULL, "sessionStreamId" uuid NOT NULL, CONSTRAINT "PK_acffe4d5864c18820399bde4116" PRIMARY KEY ("userId", "sessionStreamId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3e1a73101620f738bc61dffa19" ON "user_allocated_streams_session_stream" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c7b4b679e253d31c11e6d9934" ON "user_allocated_streams_session_stream" ("sessionStreamId") `);
        await queryRunner.query(`ALTER TABLE "session_stream_allocated_users_user" ADD CONSTRAINT "FK_e62630c379f91fe30d920b34626" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_stream_allocated_users_user" ADD CONSTRAINT "FK_76fe690bd48a4cd9aa58bfcb455" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" ADD CONSTRAINT "FK_37f7a2c9293d636e7b3c1b0482e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" ADD CONSTRAINT "FK_0285bd5e90495ffd4540a213be3" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" ADD CONSTRAINT "FK_3e1a73101620f738bc61dffa195" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" ADD CONSTRAINT "FK_0c7b4b679e253d31c11e6d99341" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" DROP CONSTRAINT "FK_0c7b4b679e253d31c11e6d99341"`);
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" DROP CONSTRAINT "FK_3e1a73101620f738bc61dffa195"`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" DROP CONSTRAINT "FK_0285bd5e90495ffd4540a213be3"`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" DROP CONSTRAINT "FK_37f7a2c9293d636e7b3c1b0482e"`);
        await queryRunner.query(`ALTER TABLE "session_stream_allocated_users_user" DROP CONSTRAINT "FK_76fe690bd48a4cd9aa58bfcb455"`);
        await queryRunner.query(`ALTER TABLE "session_stream_allocated_users_user" DROP CONSTRAINT "FK_e62630c379f91fe30d920b34626"`);
        await queryRunner.query(`DROP INDEX "IDX_0c7b4b679e253d31c11e6d9934"`);
        await queryRunner.query(`DROP INDEX "IDX_3e1a73101620f738bc61dffa19"`);
        await queryRunner.query(`DROP TABLE "user_allocated_streams_session_stream"`);
        await queryRunner.query(`DROP INDEX "IDX_0285bd5e90495ffd4540a213be"`);
        await queryRunner.query(`DROP INDEX "IDX_37f7a2c9293d636e7b3c1b0482"`);
        await queryRunner.query(`DROP TABLE "user_allocated_sessions_session"`);
        await queryRunner.query(`DROP INDEX "IDX_76fe690bd48a4cd9aa58bfcb45"`);
        await queryRunner.query(`DROP INDEX "IDX_e62630c379f91fe30d920b3462"`);
        await queryRunner.query(`DROP TABLE "session_stream_allocated_users_user"`);
    }

}
