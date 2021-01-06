import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1608515129064 implements MigrationInterface {
    name = 'Migration1608515129064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" RENAME COLUMN "breakWeeks" TO "weekNames"`);
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "weekNames"`);
        await queryRunner.query(`ALTER TABLE "term" ADD "weekNames" character varying array NOT NULL DEFAULT array[]::varchar[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "weekNames"`);
        await queryRunner.query(`ALTER TABLE "term" ADD "weekNames" integer array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "term" RENAME COLUMN "weekNames" TO "breakWeeks"`);
    }

}
