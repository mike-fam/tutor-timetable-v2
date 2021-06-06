import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1611889335238 implements MigrationInterface {
	name = "Migration1611889335238";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "staff_request" ADD "title" character varying NOT NULL`);
		await queryRunner.query(`ALTER TABLE "staff_request" ADD "description" character varying NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "description"`);
		await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "title"`);
	}

}
