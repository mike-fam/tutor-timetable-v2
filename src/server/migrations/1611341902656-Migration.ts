import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1611341902656 implements MigrationInterface {
    name = 'Migration1611341902656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_stream" ADD "numberOfStaff" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD "isNew" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_staff" DROP COLUMN "isNew"`);
        await queryRunner.query(`ALTER TABLE "session_stream" DROP COLUMN "numberOfStaff"`);
    }

}
