import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1625156685025 implements MigrationInterface {
    name = 'Migration1625156685025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_stream" DROP CONSTRAINT "CHK_547b21ea1dbf8d0c351c1177c4"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP CONSTRAINT "CHK_048b5ceb22fa1888c5c49d0139"`);
        await queryRunner.query(`ALTER TABLE "session_stream" ADD CONSTRAINT "CHK_99acefc65b5e400789a89ceabe" CHECK ("type" = 'Contact' OR "type" = 'Practical' OR "type" = 'Tutorial' OR "type" = 'Seminar' OR "type" = 'Lecture' OR "type" = 'Studio' OR "type" = 'Workshop')`);
        await queryRunner.query(`ALTER TABLE "preference" ADD CONSTRAINT "CHK_80d4e63c0cab8968f42de54aa9" CHECK ("sessionType" = 'Contact' OR "sessionType" = 'Practical' OR "sessionType" = 'Tutorial' OR "sessionType" = 'Seminar' OR "sessionType" = 'Lecture' OR "sessionType" = 'Studio' OR "sessionType" = 'Workshop')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" DROP CONSTRAINT "CHK_80d4e63c0cab8968f42de54aa9"`);
        await queryRunner.query(`ALTER TABLE "session_stream" DROP CONSTRAINT "CHK_99acefc65b5e400789a89ceabe"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD CONSTRAINT "CHK_048b5ceb22fa1888c5c49d0139" CHECK (((("sessionType")::text = 'Practical'::text) OR (("sessionType")::text = 'Tutorial'::text) OR (("sessionType")::text = 'Seminar'::text) OR (("sessionType")::text = 'Lecture'::text) OR (("sessionType")::text = 'Studio'::text)))`);
        await queryRunner.query(`ALTER TABLE "session_stream" ADD CONSTRAINT "CHK_547b21ea1dbf8d0c351c1177c4" CHECK ((((type)::text = 'Practical'::text) OR ((type)::text = 'Tutorial'::text) OR ((type)::text = 'Seminar'::text) OR ((type)::text = 'Lecture'::text) OR ((type)::text = 'Studio'::text)))`);
    }

}
