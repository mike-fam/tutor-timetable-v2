import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1675422141282 implements MigrationInterface {
    name = 'Migration1675422141282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" DROP CONSTRAINT "FK_bb2583a46037ff9e3acba0c545b"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD CONSTRAINT "FK_bb2583a46037ff9e3acba0c545b" FOREIGN KEY ("courseStaffId") REFERENCES "course_staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" DROP CONSTRAINT "FK_bb2583a46037ff9e3acba0c545b"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD CONSTRAINT "FK_bb2583a46037ff9e3acba0c545b" FOREIGN KEY ("courseStaffId") REFERENCES "course_staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
