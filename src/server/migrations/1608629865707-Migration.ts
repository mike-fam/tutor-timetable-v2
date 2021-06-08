import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1608629865707 implements MigrationInterface {
	name = "Migration1608629865707";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "course_staff" ADD "role" character varying NOT NULL`);
		await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
		await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT array[]::varchar[]`);
		await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "CHK_7134fed2fd5c843787e17ccd39" CHECK ("role" = 'Course Coordinator' OR "role" = 'Staff')`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "CHK_7134fed2fd5c843787e17ccd39"`);
		await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT ARRAY[]`);
		await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
		await queryRunner.query(`ALTER TABLE "course_staff" DROP COLUMN "role"`);
	}

}
