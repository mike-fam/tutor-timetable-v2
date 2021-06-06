import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1608600357360 implements MigrationInterface {
	name = "Migration1608600357360";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "startDate"`);
		await queryRunner.query(`ALTER TABLE "term" ADD "startDate" TIMESTAMP NOT NULL`);
		await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
		await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT array[]::varchar[]`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT ARRAY[]`);
		await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
		await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "startDate"`);
		await queryRunner.query(`ALTER TABLE "term" ADD "startDate" date NOT NULL`);
	}

}
