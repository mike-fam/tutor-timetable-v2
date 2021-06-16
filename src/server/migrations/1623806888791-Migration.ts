import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1623806888791 implements MigrationInterface {
    name = 'Migration1623806888791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_stream" DROP CONSTRAINT "FK_e5d1bede2546c0a492f77ae71ec"`);
        await queryRunner.query(`ALTER TABLE "session_stream" ADD CONSTRAINT "FK_e5d1bede2546c0a492f77ae71ec" FOREIGN KEY ("basedId") REFERENCES "session_stream"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_stream" DROP CONSTRAINT "FK_e5d1bede2546c0a492f77ae71ec"`);
        await queryRunner.query(`ALTER TABLE "session_stream" ADD CONSTRAINT "FK_e5d1bede2546c0a492f77ae71ec" FOREIGN KEY ("basedId") REFERENCES "session_stream"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
