import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1609484892238 implements MigrationInterface {
	name = "Migration1609484892238";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "staff_request" ADD "type" character varying NOT NULL`);
		await queryRunner.query(`ALTER TABLE "staff_request" ADD "status" character varying NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "status"`);
		await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "type"`);
	}

}
