import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1612775365234 implements MigrationInterface {
	name = "Migration1612775365234";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "offer" ("id" SERIAL NOT NULL, "requestId" integer, "userId" integer, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "offer_preferences_session" ("offerId" integer NOT NULL, "sessionId" integer NOT NULL, CONSTRAINT "PK_192129d1763740f5519d150d033" PRIMARY KEY ("offerId", "sessionId"))`);
		await queryRunner.query(`CREATE INDEX "IDX_971f3356e937e94d7c26d27d15" ON "offer_preferences_session" ("offerId") `);
		await queryRunner.query(`CREATE INDEX "IDX_3a098cb4f1707a4d217954cfab" ON "offer_preferences_session" ("sessionId") `);
		await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_0a9f568475b4a5401669c61333f" FOREIGN KEY ("requestId") REFERENCES "staff_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_e8100751be1076656606ae045e3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "offer_preferences_session" ADD CONSTRAINT "FK_971f3356e937e94d7c26d27d15a" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "offer_preferences_session" ADD CONSTRAINT "FK_3a098cb4f1707a4d217954cfab9" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offer_preferences_session" DROP CONSTRAINT "FK_3a098cb4f1707a4d217954cfab9"`);
		await queryRunner.query(`ALTER TABLE "offer_preferences_session" DROP CONSTRAINT "FK_971f3356e937e94d7c26d27d15a"`);
		await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_e8100751be1076656606ae045e3"`);
		await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_0a9f568475b4a5401669c61333f"`);
		await queryRunner.query(`DROP INDEX "IDX_3a098cb4f1707a4d217954cfab"`);
		await queryRunner.query(`DROP INDEX "IDX_971f3356e937e94d7c26d27d15"`);
		await queryRunner.query(`DROP TABLE "offer_preferences_session"`);
		await queryRunner.query(`DROP TABLE "offer"`);
	}

}
