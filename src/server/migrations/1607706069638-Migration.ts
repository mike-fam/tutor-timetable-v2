import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1607706069638 implements MigrationInterface {
    name = "Migration1607706069638";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE \"user\" (\"username\" character varying(9) NOT NULL, \"name\" character varying(64) NOT NULL, \"email\" character varying(256) NOT NULL, CONSTRAINT \"PK_78a916df40e02a9deb1c4b75edb\" PRIMARY KEY (\"username\"))"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"user\"");
    }
}
