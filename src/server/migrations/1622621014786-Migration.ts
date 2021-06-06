import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1622621014786 implements MigrationInterface {
	name = "Migration1622621014786";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offer" RENAME COLUMN "allowNoSwap" TO "mustSwap"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offer" RENAME COLUMN "mustSwap" TO "allowNoSwap"`);
	}

}
