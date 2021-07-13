import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1625879947261 implements MigrationInterface {
    name = 'Migration1625879947261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.session_stream_allocated_users_user DROP CONSTRAINT IF EXISTS "FK_e62630c379f91fe30d920b34626"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.session_stream_allocated_users_user DROP CONSTRAINT IF EXISTS "FK_76fe690bd48a4cd9aa58bfcb455"`);
        await queryRunner.query(`DROP INDEX IF EXISTS public."IDX_76fe690bd48a4cd9aa58bfcb45"`);
        await queryRunner.query(`DROP INDEX IF EXISTS public."IDX_e62630c379f91fe30d920b3462"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.session_stream_allocated_users_user DROP CONSTRAINT IF EXISTS "PK_4ac2d5c51b2a40fab3d090c5d4d"`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.session_stream_allocated_users_user`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE public.session_stream_allocated_users_user ("sessionStreamId" uuid NOT NULL, "userId" uuid NOT NULL)`);
        await queryRunner.query(`ALTER TABLE ONLY public.session_stream_allocated_users_user ADD CONSTRAINT "PK_4ac2d5c51b2a40fab3d090c5d4d" PRIMARY KEY ("sessionStreamId", "userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_76fe690bd48a4cd9aa58bfcb45" ON public.session_stream_allocated_users_user USING btree ("userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_e62630c379f91fe30d920b3462" ON public.session_stream_allocated_users_user USING btree ("sessionStreamId")`);
        await queryRunner.query(`ALTER TABLE ONLY public.session_stream_allocated_users_user ADD CONSTRAINT "FK_76fe690bd48a4cd9aa58bfcb455" FOREIGN KEY ("userId") REFERENCES public."user"(id)`);
        await queryRunner.query(`ALTER TABLE ONLY public.session_stream_allocated_users_user ADD CONSTRAINT "FK_e62630c379f91fe30d920b34626" FOREIGN KEY ("sessionStreamId") REFERENCES public.session_stream(id) ON UPDATE CASCADE ON DELETE CASCADE`);
    }

}
