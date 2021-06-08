import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1622893691814 implements MigrationInterface {
	name = "Migration1622893691814";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_6e406f88ffcac36d89c6887d7be"`);
		await queryRunner.query(`ALTER TABLE "staff_request" DROP COLUMN "acceptorId"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "staff_request" ADD "acceptorId" uuid`);
		await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_6e406f88ffcac36d89c6887d7be" FOREIGN KEY ("acceptorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

}
