import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1609505756451 implements MigrationInterface {
    name = 'Migration1609505756451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "staff_request_swap_preference_session" ("staffRequestId" integer NOT NULL, "sessionId" integer NOT NULL, CONSTRAINT "PK_8d7af521a17327e34412a71a699" PRIMARY KEY ("staffRequestId", "sessionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9159aa0df8131c1cd0f242c84d" ON "staff_request_swap_preference_session" ("staffRequestId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c13a3a9d35ffb7497f0a93cb57" ON "staff_request_swap_preference_session" ("sessionId") `);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" ADD CONSTRAINT "FK_9159aa0df8131c1cd0f242c84dc" FOREIGN KEY ("staffRequestId") REFERENCES "staff_request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" ADD CONSTRAINT "FK_c13a3a9d35ffb7497f0a93cb570" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" DROP CONSTRAINT "FK_c13a3a9d35ffb7497f0a93cb570"`);
        await queryRunner.query(`ALTER TABLE "staff_request_swap_preference_session" DROP CONSTRAINT "FK_9159aa0df8131c1cd0f242c84dc"`);
        await queryRunner.query(`DROP INDEX "IDX_c13a3a9d35ffb7497f0a93cb57"`);
        await queryRunner.query(`DROP INDEX "IDX_9159aa0df8131c1cd0f242c84d"`);
        await queryRunner.query(`DROP TABLE "staff_request_swap_preference_session"`);
    }

}
