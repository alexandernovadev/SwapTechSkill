import { MigrationInterface, QueryRunner } from "typeorm";

export class MeetingsNewDesign1728084764727 implements MigrationInterface {
    name = 'MeetingsNewDesign1728084764727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Meetings" DROP CONSTRAINT "FK_fcd8c4628cecbdbb88dc8775307"`);
        await queryRunner.query(`ALTER TABLE "Meetings" DROP COLUMN "organizerId"`);
        await queryRunner.query(`ALTER TABLE "Meetings" DROP COLUMN "zoom_link"`);
        await queryRunner.query(`ALTER TABLE "Meetings" ADD "meet_link" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "Meetings" ADD "organizer_id" integer`);
        await queryRunner.query(`ALTER TABLE "Meetings" ADD "chat_id" integer`);
        await queryRunner.query(`ALTER TABLE "Meetings" ADD CONSTRAINT "FK_1bb6b385a78e3c84be6defbc49b" FOREIGN KEY ("organizer_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Meetings" ADD CONSTRAINT "FK_65c495b6b038fc86547c16ad7d1" FOREIGN KEY ("chat_id") REFERENCES "Chats"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Meetings" DROP CONSTRAINT "FK_65c495b6b038fc86547c16ad7d1"`);
        await queryRunner.query(`ALTER TABLE "Meetings" DROP CONSTRAINT "FK_1bb6b385a78e3c84be6defbc49b"`);
        await queryRunner.query(`ALTER TABLE "Meetings" DROP COLUMN "chat_id"`);
        await queryRunner.query(`ALTER TABLE "Meetings" DROP COLUMN "organizer_id"`);
        await queryRunner.query(`ALTER TABLE "Meetings" DROP COLUMN "meet_link"`);
        await queryRunner.query(`ALTER TABLE "Meetings" ADD "zoom_link" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "Meetings" ADD "organizerId" integer`);
        await queryRunner.query(`ALTER TABLE "Meetings" ADD CONSTRAINT "FK_fcd8c4628cecbdbb88dc8775307" FOREIGN KEY ("organizerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
