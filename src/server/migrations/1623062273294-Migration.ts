import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1623062273294 implements MigrationInterface {
    name = 'Migration1623062273294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "settingsId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_390395c3d8592e3e8d8422ce853" UNIQUE ("settingsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_390395c3d8592e3e8d8422ce853" FOREIGN KEY ("settingsId") REFERENCES "user_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_390395c3d8592e3e8d8422ce853"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_390395c3d8592e3e8d8422ce853"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "settingsId"`);
    }

}
