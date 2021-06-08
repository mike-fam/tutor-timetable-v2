import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1608507278381 implements MigrationInterface {
	name = "Migration1608507278381";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "UQ_5cf4963ae12285cda6432d5a3a4"`);
		await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "code"`);
		await queryRunner.query(`ALTER TABLE "course" ADD "code" character varying(20) NOT NULL`);
		await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "UQ_5cf4963ae12285cda6432d5a3a4" UNIQUE ("code")`);
		await queryRunner.query(`ALTER TABLE "timetable" ADD CONSTRAINT "UQ_091ca503e51c3de094972d48cb2" UNIQUE ("courseId", "termId")`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "timetable" DROP CONSTRAINT "UQ_091ca503e51c3de094972d48cb2"`);
		await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "UQ_5cf4963ae12285cda6432d5a3a4"`);
		await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "code"`);
		await queryRunner.query(`ALTER TABLE "course" ADD "code" character varying(9) NOT NULL`);
		await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "UQ_5cf4963ae12285cda6432d5a3a4" UNIQUE ("code")`);
	}

}
