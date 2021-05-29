import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1622325662597 implements MigrationInterface {
    name = 'Migration1622325662597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "CHK_adec3f2985b0ba91460fafbf2b" CHECK ("status" = 'OPEN' OR "status" = 'ACCEPTED' OR "status" = 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "CHK_a99348feda038552ca057e8cec" CHECK ("status" = 'Open' OR "status" = 'Closed')`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "CHK_290305054f404d50c3f1435a24" CHECK ("type" = 'Permanent' OR "type" = 'Temporary')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "CHK_290305054f404d50c3f1435a24"`);
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "CHK_a99348feda038552ca057e8cec"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "CHK_adec3f2985b0ba91460fafbf2b"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "status"`);
    }

}
