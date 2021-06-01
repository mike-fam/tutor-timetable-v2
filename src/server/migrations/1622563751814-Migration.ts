import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1622563751814 implements MigrationInterface {
    name = 'Migration1622563751814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_6e406f88ffcac36d89c6887d7be"`);
        await queryRunner.query(`ALTER TABLE "staff_request" ALTER COLUMN "acceptorId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "staff_request"."acceptorId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_6e406f88ffcac36d89c6887d7be" FOREIGN KEY ("acceptorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_request" DROP CONSTRAINT "FK_6e406f88ffcac36d89c6887d7be"`);
        await queryRunner.query(`COMMENT ON COLUMN "staff_request"."acceptorId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "staff_request" ALTER COLUMN "acceptorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff_request" ADD CONSTRAINT "FK_6e406f88ffcac36d89c6887d7be" FOREIGN KEY ("acceptorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
