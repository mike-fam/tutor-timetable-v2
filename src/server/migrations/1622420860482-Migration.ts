import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1622420860482 implements MigrationInterface {
	name = "Migration1622420860482";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "staff_request" ADD "allowNonPrefOffers" boolean NOT NULL DEFAULT false`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "allowNonPrefOffers"`);
	}

}
