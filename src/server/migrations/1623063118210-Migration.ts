import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1623063118210 implements MigrationInterface {
    name = 'Migration1623063118210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_settings" ADD "showMySessions" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`ALTER TABLE "user_settings" DROP COLUMN "showMySessions"`);
    }

}
