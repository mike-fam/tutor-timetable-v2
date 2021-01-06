import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1608600591223 implements MigrationInterface {
    name = 'Migration1608600591223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "term" ADD "endDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
        await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT array[]::varchar[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "term" ADD "endDate" date NOT NULL`);
    }

}
