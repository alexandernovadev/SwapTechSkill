import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSkillReciverAndSkillSender1727640012640 implements MigrationInterface {
    name = 'AddSkillReciverAndSkillSender1727640012640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FriendRequests" ADD "skillSenderId" integer`);
        await queryRunner.query(`ALTER TABLE "FriendRequests" ADD "skillReceiverId" integer`);
        await queryRunner.query(`ALTER TABLE "FriendRequests" ADD CONSTRAINT "FK_9afa4c123ea6faaf3badbe12c6a" FOREIGN KEY ("skillSenderId") REFERENCES "Skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "FriendRequests" ADD CONSTRAINT "FK_fa0ad92e9df269d644101bbd1d6" FOREIGN KEY ("skillReceiverId") REFERENCES "Skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FriendRequests" DROP CONSTRAINT "FK_fa0ad92e9df269d644101bbd1d6"`);
        await queryRunner.query(`ALTER TABLE "FriendRequests" DROP CONSTRAINT "FK_9afa4c123ea6faaf3badbe12c6a"`);
        await queryRunner.query(`ALTER TABLE "FriendRequests" DROP COLUMN "skillReceiverId"`);
        await queryRunner.query(`ALTER TABLE "FriendRequests" DROP COLUMN "skillSenderId"`);
    }

}
