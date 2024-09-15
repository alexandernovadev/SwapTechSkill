import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLevelStudyAndStateToUserProfessionalStudy1726437666266 implements MigrationInterface {
    name = 'AddLevelStudyAndStateToUserProfessionalStudy1726437666266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserProfessionalStudies" ADD "level_study" text`);
        await queryRunner.query(`ALTER TABLE "UserProfessionalStudies" ADD "state" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserProfessionalStudies" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "UserProfessionalStudies" DROP COLUMN "level_study"`);
    }

}
