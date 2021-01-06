import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1608389153900 implements MigrationInterface {
    name = 'Migration1608389153900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" ADD CONSTRAINT "CHK_d81e521696083e267eeb269b51" CHECK ("type" = 'Semester' OR "type" = 'Trimester')`);
        await queryRunner.query(`ALTER TABLE "term" ADD CONSTRAINT "UQ_88fe980589efc632ca143f7a373" UNIQUE ("index", "type", "year")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" DROP CONSTRAINT "UQ_88fe980589efc632ca143f7a373"`);
        await queryRunner.query(`ALTER TABLE "term" DROP CONSTRAINT "CHK_d81e521696083e267eeb269b51"`);
    }

}
