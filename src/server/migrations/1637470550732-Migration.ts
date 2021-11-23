import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1637470550732 implements MigrationInterface {
    name = 'Migration1637470550732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timetable" DROP COLUMN "allocationToken"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timetable" ADD "allocationToken" character varying`);
    }

}
