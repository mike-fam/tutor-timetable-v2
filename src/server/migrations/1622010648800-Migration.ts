import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1622010648800 implements MigrationInterface {
	name = "Migration1622010648800";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
	}

}
