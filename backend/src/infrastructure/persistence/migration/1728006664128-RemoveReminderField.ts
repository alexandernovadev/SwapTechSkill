import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveReminderField1728006664128 implements MigrationInterface {
    name = 'RemoveReminderField1728006664128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Meetings" DROP COLUMN "reminder_time"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Meetings" ADD "reminder_time" TIMESTAMP`);
    }

}
