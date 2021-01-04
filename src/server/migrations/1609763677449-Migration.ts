import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1609763677449 implements MigrationInterface {
    name = 'Migration1609763677449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_e18308596f3076e9de1d80c6f51"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "sessionStreamId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "session"."sessionStreamId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "UQ_3d57e44540eb64af0e24d4a02ab" UNIQUE ("sessionStreamId", "week")`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_e18308596f3076e9de1d80c6f51" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_e18308596f3076e9de1d80c6f51"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "UQ_3d57e44540eb64af0e24d4a02ab"`);
        await queryRunner.query(`COMMENT ON COLUMN "session"."sessionStreamId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "sessionStreamId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_e18308596f3076e9de1d80c6f51" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
