import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1610435742105 implements MigrationInterface {
	name = "Migration1610435742105";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "timeslot" ("id" SERIAL NOT NULL, "startTime" integer NOT NULL, "endTime" integer NOT NULL, "day" integer NOT NULL, "userUsername" character varying(9), CONSTRAINT "CHK_95c0b9a2c1c9e29b999b3fc9ab" CHECK ("day" = 1 OR "day" = 2 OR "day" = 3 OR "day" = 4 OR "day" = 5 OR "day" = 6 OR "day" = 7), CONSTRAINT "PK_cd8bca557ee1eb5b090b9e63009" PRIMARY KEY ("id"))`);
		await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
		await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT array[]::varchar[]`);
		await queryRunner.query(`ALTER TABLE "timeslot" ADD CONSTRAINT "FK_ecb27d40dfe5c9b8817210ee53f" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "timeslot" DROP CONSTRAINT "FK_ecb27d40dfe5c9b8817210ee53f"`);
		await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "weekNames" SET DEFAULT ARRAY[]`);
		await queryRunner.query(`COMMENT ON COLUMN "term"."weekNames" IS NULL`);
		await queryRunner.query(`DROP TABLE "timeslot"`);
	}

}
