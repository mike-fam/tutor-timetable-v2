import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1608727537693 implements MigrationInterface {
	name = "Migration1608727537693";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "term" DROP CONSTRAINT "CHK_d81e521696083e267eeb269b51"`);
		await queryRunner.query(`ALTER TABLE "term" DROP CONSTRAINT "UQ_88fe980589efc632ca143f7a373"`);
		await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "index"`);
		await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
		await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT array[]::varchar[]`);
		await queryRunner.query(`ALTER TABLE "term" ADD CONSTRAINT "CHK_b064a25bca4e26fd9ca3f69a13" CHECK ("type" = 'Semester 1' OR "type" = 'Semester 2' OR "type" = 'Summer Semester' OR "type" = 'Trimester 1' OR "type" = 'Trimester 2' OR "type" = 'Trimester 3')`);
		await queryRunner.query(`ALTER TABLE "term" ADD CONSTRAINT "UQ_97a51c8bbbe5d3db497ccffe035" UNIQUE ("type", "year")`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "term" DROP CONSTRAINT "UQ_97a51c8bbbe5d3db497ccffe035"`);
		await queryRunner.query(`ALTER TABLE "term" DROP CONSTRAINT "CHK_b064a25bca4e26fd9ca3f69a13"`);
		await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT ARRAY[]`);
		await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
		await queryRunner.query(`ALTER TABLE "term" ADD "index" integer NOT NULL`);
		await queryRunner.query(`ALTER TABLE "term" ADD CONSTRAINT "UQ_88fe980589efc632ca143f7a373" UNIQUE ("type", "index", "year")`);
		await queryRunner.query(`ALTER TABLE "term" ADD CONSTRAINT "CHK_d81e521696083e267eeb269b51" CHECK ((((type)::text = 'Semester'::text) OR ((type)::text = 'Trimester'::text)))`);
	}

}
