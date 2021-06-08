import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1623032138551 implements MigrationInterface {
    name = 'Migration1623032138551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "FK_d3dfdd3bab57eedfcf1e45bc72d"`);
        await queryRunner.query(`ALTER TABLE "course_staff" ALTER COLUMN "preferenceId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "course_staff"."preferenceId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "FK_d3dfdd3bab57eedfcf1e45bc72d" FOREIGN KEY ("preferenceId") REFERENCES "preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "FK_d3dfdd3bab57eedfcf1e45bc72d"`);
        await queryRunner.query(`COMMENT ON COLUMN "course_staff"."preferenceId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course_staff" ALTER COLUMN "preferenceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "FK_d3dfdd3bab57eedfcf1e45bc72d" FOREIGN KEY ("preferenceId") REFERENCES "preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
