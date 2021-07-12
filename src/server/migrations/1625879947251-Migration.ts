import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1625879947251 implements MigrationInterface {
    name = 'Migration1625879947251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.session_allocation DROP CONSTRAINT IF EXISTS "FK_4ad45c42f963d66b7d38b6e9fe8"`)
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.session_allocation DROP CONSTRAINT IF EXISTS "FK_4229fc0a3545c3afd0bfb0bb7e4"`)
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.session_allocation DROP CONSTRAINT IF EXISTS "UQ_48fa99dd8231087c41a285f606f"`)
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.session_allocation DROP CONSTRAINT IF EXISTS "PK_52c1e1b8d5dfae4448fb5c0d122"`)
        await queryRunner.query(`DROP TABLE IF EXISTS public.session_allocation`)
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.stream_allocation DROP CONSTRAINT IF EXISTS "UQ_8b449413d5d44c30ffff74aa0f0"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.stream_allocation DROP CONSTRAINT IF EXISTS "FK_bc7afec02062c5cedc6d14bd6af"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.stream_allocation DROP CONSTRAINT IF EXISTS "FK_b3d5528826d766b691e1132107f"`);
        await queryRunner.query(`ALTER TABLE IF EXISTS ONLY public.stream_allocation DROP CONSTRAINT IF EXISTS "PK_8ec85fd9f1f15f195b27a532dd9"`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.stream_allocation`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE public.session_allocation ( id uuid DEFAULT public.uuid_generate_v4() NOT NULL, "sessionId" uuid NOT NULL, "userId" uuid NOT NULL )`);
        await queryRunner.query(`ALTER TABLE ONLY public.session_allocation ADD CONSTRAINT "PK_52c1e1b8d5dfae4448fb5c0d122" PRIMARY KEY (id)`);
        await queryRunner.query(`ALTER TABLE ONLY public.session_allocation ADD CONSTRAINT "UQ_48fa99dd8231087c41a285f606f" UNIQUE ("sessionId", "userId")`);
        await queryRunner.query(`ALTER TABLE ONLY public.session_allocation ADD CONSTRAINT "FK_4229fc0a3545c3afd0bfb0bb7e4" FOREIGN KEY ("sessionId") REFERENCES public.session(id)`);
        await queryRunner.query(`ALTER TABLE ONLY public.session_allocation ADD CONSTRAINT "FK_4ad45c42f963d66b7d38b6e9fe8" FOREIGN KEY ("userId") REFERENCES public."user"(id)`);
        await queryRunner.query(`CREATE TABLE public.stream_allocation (id uuid DEFAULT public.uuid_generate_v4() NOT NULL, "sessionStreamId" uuid NOT NULL, "userId" uuid NOT NULL)`);
        await queryRunner.query(`ALTER TABLE ONLY public.stream_allocation ADD CONSTRAINT "PK_8ec85fd9f1f15f195b27a532dd9" PRIMARY KEY (id)`);
        await queryRunner.query(`ALTER TABLE ONLY public.stream_allocation ADD CONSTRAINT "UQ_8b449413d5d44c30ffff74aa0f0" UNIQUE ("sessionStreamId", "userId")`);
        await queryRunner.query(`ALTER TABLE ONLY public.stream_allocation ADD CONSTRAINT "FK_b3d5528826d766b691e1132107f" FOREIGN KEY ("sessionStreamId") REFERENCES public.session_stream(id)`);
        await queryRunner.query(`ALTER TABLE ONLY public.stream_allocation ADD CONSTRAINT "FK_bc7afec02062c5cedc6d14bd6af" FOREIGN KEY ("userId") REFERENCES public."user"(id)`);
    }

}
