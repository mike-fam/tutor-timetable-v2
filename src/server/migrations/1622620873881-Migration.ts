import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1622620873881 implements MigrationInterface {
	name = "Migration1622620873881";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offer" ADD "allowNoSwap" boolean NOT NULL DEFAULT false`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "allowNoSwap"`);
	}

}
