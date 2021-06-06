import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1622619001323 implements MigrationInterface {
	name = "Migration1622619001323";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offer" ADD "acceptedSessionId" uuid`);
		await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_b5bd4b6466627203e4bc13b5fe0" FOREIGN KEY ("acceptedSessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_b5bd4b6466627203e4bc13b5fe0"`);
		await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "acceptedSessionId"`);
	}

}
