import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1610544047125 implements MigrationInterface {
    name = 'Migration1610544047125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timeslot" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD "startTime" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "timeslot" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD "endTime" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timeslot" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD "endTime" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "timeslot" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD "startTime" integer NOT NULL`);
    }

}
