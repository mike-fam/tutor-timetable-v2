import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1623806080691 implements MigrationInterface {
    name = 'Migration1623806080691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_e18308596f3076e9de1d80c6f51"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_e18308596f3076e9de1d80c6f51" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_e18308596f3076e9de1d80c6f51"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_e18308596f3076e9de1d80c6f51" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
