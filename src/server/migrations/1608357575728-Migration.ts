import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1608357575728 implements MigrationInterface {
	name = "Migration1608357575728";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "term" ADD "index" integer NOT NULL`);
		await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "year"`);
		await queryRunner.query(`ALTER TABLE "term" ADD "year" integer NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "year"`);
		await queryRunner.query(`ALTER TABLE "term" ADD "year" character varying(100) NOT NULL`);
		await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "index"`);
	}

}
