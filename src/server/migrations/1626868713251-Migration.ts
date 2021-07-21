import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1626868713251 implements MigrationInterface {
    name = 'Migration1626868713251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timetable" DROP COLUMN "allocationToken"`);
        await queryRunner.query(`ALTER TABLE "timetable" ADD "allocationToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timetable" DROP COLUMN "allocationToken"`);
        await queryRunner.query(`ALTER TABLE "timetable" ADD "allocationToken" uuid`);
    }

}
