import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1611010071679 implements MigrationInterface {
    name = 'Migration1611010071679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" ALTER COLUMN "sessionType" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "preference"."sessionType" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "preference"."sessionType" IS NULL`);
        await queryRunner.query(`ALTER TABLE "preference" ALTER COLUMN "sessionType" SET NOT NULL`);
    }

}
