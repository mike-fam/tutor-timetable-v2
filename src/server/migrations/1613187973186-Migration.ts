import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1613187973186 implements MigrationInterface {
    name = 'Migration1613187973186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_0f5d437fc98264cfb98dafdf080"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "UQ_3aa706a41308e3fd7107bf5d078"`);
        await queryRunner.query(`ALTER TABLE "staff_request" ALTER COLUMN "sessionId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "staff_request"."sessionId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "UQ_3aa706a41308e3fd7107bf5d078" UNIQUE ("requesterId", "sessionId")`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_0f5d437fc98264cfb98dafdf080" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_0f5d437fc98264cfb98dafdf080"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "UQ_3aa706a41308e3fd7107bf5d078"`);
        await queryRunner.query(`COMMENT ON COLUMN "staff_request"."sessionId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "staff_request" ALTER COLUMN "sessionId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "UQ_3aa706a41308e3fd7107bf5d078" UNIQUE ("sessionId", "requesterId")`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_0f5d437fc98264cfb98dafdf080" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
