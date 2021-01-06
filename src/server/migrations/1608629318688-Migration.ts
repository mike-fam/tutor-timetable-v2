import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1608629318688 implements MigrationInterface {
    name = 'Migration1608629318688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
        await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT array[]::varchar[]`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "title" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "title" character varying(9) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
    }

}
