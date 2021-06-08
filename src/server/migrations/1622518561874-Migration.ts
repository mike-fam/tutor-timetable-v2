import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1622518561874 implements MigrationInterface {
	name = "Migration1622518561874";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "CHK_adec3f2985b0ba91460fafbf2b"`);
		await queryRunner.query(`COMMENT ON COLUMN "offer"."status" IS NULL`);
		await queryRunner.query(`ALTER TABLE "offer" ALTER COLUMN "status" SET DEFAULT 'OPEN'`);
		await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "CHK_3898cca51d95c3dff6602780bf" CHECK ("status" = 'OPEN' OR "status" = 'ACCEPTED' OR "status" = 'REJECTED' OR "status" = 'AWAITING_APPROVAL')`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "CHK_3898cca51d95c3dff6602780bf"`);
		await queryRunner.query(`ALTER TABLE "offer" ALTER COLUMN "status" DROP DEFAULT`);
		await queryRunner.query(`COMMENT ON COLUMN "offer"."status" IS NULL`);
		await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "CHK_adec3f2985b0ba91460fafbf2b" CHECK ((((status)::text = 'OPEN'::text) OR ((status)::text = 'ACCEPTED'::text) OR ((status)::text = 'REJECTED'::text)))`);
	}

}
