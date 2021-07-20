import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1626225233362 implements MigrationInterface {
    name = 'Migration1626225233362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_stream" DROP CONSTRAINT "FK_e5d1bede2546c0a492f77ae71ec"`);
        await queryRunner.query(`ALTER TABLE "session_stream" RENAME COLUMN "basedId" TO "rootId"`);
        await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT array[]::varchar[]`);
        await queryRunner.query(`ALTER TABLE "session_stream" ADD CONSTRAINT "FK_01ed4ecc41e93348d2edfa8f0a7" FOREIGN KEY ("rootId") REFERENCES "session_stream"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_stream" DROP CONSTRAINT "FK_01ed4ecc41e93348d2edfa8f0a7"`);
        await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "session_stream" RENAME COLUMN "rootId" TO "basedId"`);
        await queryRunner.query(`ALTER TABLE "session_stream" ADD CONSTRAINT "FK_e5d1bede2546c0a492f77ae71ec" FOREIGN KEY ("basedId") REFERENCES "session_stream"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
