import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1622105602942 implements MigrationInterface {
	name = "Migration1622105602942";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`COMMENT ON COLUMN "user"."isAdmin" IS NULL`);
		await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isAdmin" SET DEFAULT false`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isAdmin" DROP DEFAULT`);
		await queryRunner.query(`COMMENT ON COLUMN "user"."isAdmin" IS NULL`);
	}

}
