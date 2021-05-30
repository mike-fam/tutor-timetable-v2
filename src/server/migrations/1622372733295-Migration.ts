import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1622372733295 implements MigrationInterface {
    name = 'Migration1622372733295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timetable" ADD "permanentRequestLock" character varying NOT NULL DEFAULT 'FREE'`);
        await queryRunner.query(`ALTER TABLE "timetable" ADD "temporaryRequestLock" character varying NOT NULL DEFAULT 'FREE'`);
        await queryRunner.query(`ALTER TABLE "timetable" ADD CONSTRAINT "CHK_60e32c35047968ba6f310887bf" CHECK ("temporaryRequestLock" = 'FREE' OR "temporaryRequestLock" = 'LOCK' OR "temporaryRequestLock" = 'APPROVAL_REQUIRED')`);
        await queryRunner.query(`ALTER TABLE "timetable" ADD CONSTRAINT "CHK_46d36f57d28eb598ab672c72cd" CHECK ("permanentRequestLock" = 'FREE' OR "permanentRequestLock" = 'LOCK' OR "permanentRequestLock" = 'APPROVAL_REQUIRED')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timetable" DROP CONSTRAINT "CHK_46d36f57d28eb598ab672c72cd"`);
        await queryRunner.query(`ALTER TABLE "timetable" DROP CONSTRAINT "CHK_60e32c35047968ba6f310887bf"`);
        await queryRunner.query(`ALTER TABLE "timetable" DROP COLUMN "temporaryRequestLock"`);
        await queryRunner.query(`ALTER TABLE "timetable" DROP COLUMN "permanentRequestLock"`);
    }

}
