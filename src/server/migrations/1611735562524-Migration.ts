import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1611735562524 implements MigrationInterface {
	name = "Migration1611735562524";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "FK_4229fc0a3545c3afd0bfb0bb7e4"`);
		await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "FK_4ad45c42f963d66b7d38b6e9fe8"`);
		await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "UQ_48fa99dd8231087c41a285f606f"`);
		await queryRunner.query(`ALTER TABLE "session_allocation" ALTER COLUMN "sessionId" SET NOT NULL`);
		await queryRunner.query(`COMMENT ON COLUMN "session_allocation"."sessionId" IS NULL`);
		await queryRunner.query(`ALTER TABLE "session_allocation" ALTER COLUMN "userId" SET NOT NULL`);
		await queryRunner.query(`COMMENT ON COLUMN "session_allocation"."userId" IS NULL`);
		await queryRunner.query(`ALTER TABLE "stream_allocation" DROP CONSTRAINT "FK_b3d5528826d766b691e1132107f"`);
		await queryRunner.query(`ALTER TABLE "stream_allocation" DROP CONSTRAINT "UQ_8b449413d5d44c30ffff74aa0f0"`);
		await queryRunner.query(`ALTER TABLE "stream_allocation" ALTER COLUMN "sessionStreamId" SET NOT NULL`);
		await queryRunner.query(`COMMENT ON COLUMN "stream_allocation"."sessionStreamId" IS NULL`);
		await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "FK_2f8044368c327e2ad804dc1fe56"`);
		await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "UQ_f33c09ecdf4a0ee5a8a27ac971d"`);
		await queryRunner.query(`ALTER TABLE "course_staff" ALTER COLUMN "timetableId" SET NOT NULL`);
		await queryRunner.query(`COMMENT ON COLUMN "course_staff"."timetableId" IS NULL`);
		await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "UQ_48fa99dd8231087c41a285f606f" UNIQUE ("sessionId", "userId")`);
		await queryRunner.query(`ALTER TABLE "stream_allocation" ADD CONSTRAINT "UQ_8b449413d5d44c30ffff74aa0f0" UNIQUE ("sessionStreamId", "userId")`);
		await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "UQ_f33c09ecdf4a0ee5a8a27ac971d" UNIQUE ("timetableId", "userId")`);
		await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "FK_4229fc0a3545c3afd0bfb0bb7e4" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "FK_4ad45c42f963d66b7d38b6e9fe8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "stream_allocation" ADD CONSTRAINT "FK_b3d5528826d766b691e1132107f" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "FK_2f8044368c327e2ad804dc1fe56" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "FK_2f8044368c327e2ad804dc1fe56"`);
		await queryRunner.query(`ALTER TABLE "stream_allocation" DROP CONSTRAINT "FK_b3d5528826d766b691e1132107f"`);
		await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "FK_4ad45c42f963d66b7d38b6e9fe8"`);
		await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "FK_4229fc0a3545c3afd0bfb0bb7e4"`);
		await queryRunner.query(`ALTER TABLE "course_staff" DROP CONSTRAINT "UQ_f33c09ecdf4a0ee5a8a27ac971d"`);
		await queryRunner.query(`ALTER TABLE "stream_allocation" DROP CONSTRAINT "UQ_8b449413d5d44c30ffff74aa0f0"`);
		await queryRunner.query(`ALTER TABLE "session_allocation" DROP CONSTRAINT "UQ_48fa99dd8231087c41a285f606f"`);
		await queryRunner.query(`COMMENT ON COLUMN "course_staff"."timetableId" IS NULL`);
		await queryRunner.query(`ALTER TABLE "course_staff" ALTER COLUMN "timetableId" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "UQ_f33c09ecdf4a0ee5a8a27ac971d" UNIQUE ("timetableId", "userId")`);
		await queryRunner.query(`ALTER TABLE "course_staff" ADD CONSTRAINT "FK_2f8044368c327e2ad804dc1fe56" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`COMMENT ON COLUMN "stream_allocation"."sessionStreamId" IS NULL`);
		await queryRunner.query(`ALTER TABLE "stream_allocation" ALTER COLUMN "sessionStreamId" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "stream_allocation" ADD CONSTRAINT "UQ_8b449413d5d44c30ffff74aa0f0" UNIQUE ("sessionStreamId", "userId")`);
		await queryRunner.query(`ALTER TABLE "stream_allocation" ADD CONSTRAINT "FK_b3d5528826d766b691e1132107f" FOREIGN KEY ("sessionStreamId") REFERENCES "session_stream"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`COMMENT ON COLUMN "session_allocation"."userId" IS NULL`);
		await queryRunner.query(`ALTER TABLE "session_allocation" ALTER COLUMN "userId" DROP NOT NULL`);
		await queryRunner.query(`COMMENT ON COLUMN "session_allocation"."sessionId" IS NULL`);
		await queryRunner.query(`ALTER TABLE "session_allocation" ALTER COLUMN "sessionId" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "UQ_48fa99dd8231087c41a285f606f" UNIQUE ("sessionId", "userId")`);
		await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "FK_4ad45c42f963d66b7d38b6e9fe8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "session_allocation" ADD CONSTRAINT "FK_4229fc0a3545c3afd0bfb0bb7e4" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

}
