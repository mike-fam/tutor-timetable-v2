import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1623023474369 implements MigrationInterface {
    name = 'Migration1623023474369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session_stream_allocated_users_user" ("sessionStreamId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_4ac2d5c51b2a40fab3d090c5d4d" PRIMARY KEY ("sessionStreamId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e62630c379f91fe30d920b3462" ON "session_stream_allocated_users_user" ("sessionStreamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_76fe690bd48a4cd9aa58bfcb45" ON "session_stream_allocated_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "timetable" ADD "allocationToken" uuid`);
        await queryRunner.query(`ALTER TABLE "session_stream_allocated_users_user" ADD CONSTRAINT "FK_e62630c379f91fe30d920b34626" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_stream_allocated_users_user" ADD CONSTRAINT "FK_76fe690bd48a4cd9aa58bfcb455" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_stream_allocated_users_user" DROP CONSTRAINT "FK_76fe690bd48a4cd9aa58bfcb455"`);
        await queryRunner.query(`ALTER TABLE "session_stream_allocated_users_user" DROP CONSTRAINT "FK_e62630c379f91fe30d920b34626"`);
        await queryRunner.query(`ALTER TABLE "timetable" DROP COLUMN "allocationToken"`);
        await queryRunner.query(`DROP INDEX "IDX_76fe690bd48a4cd9aa58bfcb45"`);
        await queryRunner.query(`DROP INDEX "IDX_e62630c379f91fe30d920b3462"`);
        await queryRunner.query(`DROP TABLE "session_stream_allocated_users_user"`);
    }

}
