import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1626805399973 implements MigrationInterface {
    name = 'Migration1626805399973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" DROP CONSTRAINT "FK_0285bd5e90495ffd4540a213be3"`);
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" DROP CONSTRAINT "FK_0c7b4b679e253d31c11e6d99341"`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" ADD CONSTRAINT "FK_0285bd5e90495ffd4540a213be3" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" ADD CONSTRAINT "FK_0c7b4b679e253d31c11e6d99341" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" DROP CONSTRAINT "FK_0c7b4b679e253d31c11e6d99341"`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" DROP CONSTRAINT "FK_0285bd5e90495ffd4540a213be3"`);
        await queryRunner.query(`ALTER TABLE "user_allocated_streams_session_stream" ADD CONSTRAINT "FK_0c7b4b679e253d31c11e6d99341" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_allocated_sessions_session" ADD CONSTRAINT "FK_0285bd5e90495ffd4540a213be3" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
