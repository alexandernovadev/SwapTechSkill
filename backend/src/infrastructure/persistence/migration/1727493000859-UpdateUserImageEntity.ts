import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserImageEntity1727493000859 implements MigrationInterface {
    name = 'UpdateUserImageEntity1727493000859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "profile_picture_url"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "profile_picture_url" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "profile_picture_url"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "profile_picture_url" character varying(255)`);
    }

}
