import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1622864231164 implements MigrationInterface {
    name = 'Migration1622864231164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" ADD "acceptedDate" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "acceptedDate"`);
    }

}
