import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1622105311658 implements MigrationInterface {
    name = 'Migration1622105311658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" ADD "isActive" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "isActive"`);
    }

}
