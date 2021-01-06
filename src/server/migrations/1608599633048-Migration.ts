import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1608599633048 implements MigrationInterface {
    name = 'Migration1608599633048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
        await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT array[]::varchar[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
    }

}
