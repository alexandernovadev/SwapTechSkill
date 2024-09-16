import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserSkillEntity1726454149150 implements MigrationInterface {
    name = 'UpdateUserSkillEntity1726454149150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserSkills" RENAME COLUMN "proficiency_level" TO "description"`);
        await queryRunner.query(`ALTER TABLE "UserSkills" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "UserSkills" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserSkills" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "UserSkills" ADD "description" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "UserSkills" RENAME COLUMN "description" TO "proficiency_level"`);
    }

}
