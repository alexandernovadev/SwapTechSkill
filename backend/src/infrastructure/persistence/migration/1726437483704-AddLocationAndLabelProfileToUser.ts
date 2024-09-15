import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocationAndLabelProfileToUser1726437483704 implements MigrationInterface {
    name = 'AddLocationAndLabelProfileToUser1726437483704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "location" text`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "label_profile" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "label_profile"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "location"`);
    }

}
