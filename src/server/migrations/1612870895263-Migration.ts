import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1612870895263 implements MigrationInterface {
    name = 'Migration1612870895263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_0a9f568475b4a5401669c61333f"`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_0a9f568475b4a5401669c61333f" FOREIGN KEY ("requestId") REFERENCES "staff_request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_0a9f568475b4a5401669c61333f"`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_0a9f568475b4a5401669c61333f" FOREIGN KEY ("requestId") REFERENCES "staff_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
