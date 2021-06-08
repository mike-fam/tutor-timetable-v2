import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1608630196646 implements MigrationInterface {
	name = "Migration1608630196646";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
		await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT array[]::varchar[]`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT ARRAY[]`);
		await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
	}

}
