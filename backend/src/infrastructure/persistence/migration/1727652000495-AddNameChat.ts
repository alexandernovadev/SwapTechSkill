import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameChat1727652000495 implements MigrationInterface {
    name = 'AddNameChat1727652000495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Chats" ADD "namechat" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Chats" DROP COLUMN "namechat"`);
    }

}
