import {MigrationInterface, QueryRunner} from 'typeorm';

export class phoneLength15Chars1673792186146 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" TYPE character varying(15)`);
        await queryRunner.query(`ALTER TABLE "suggested_contact" ALTER COLUMN "phone" TYPE character varying(15)`);
        await queryRunner.query(`ALTER TABLE "emergency_contact" ALTER COLUMN "phone" TYPE character varying(15)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" TYPE character varying(11)`);
        await queryRunner.query(`ALTER TABLE "suggested_contact" ALTER COLUMN "phone" TYPE character varying(11)`);
        await queryRunner.query(`ALTER TABLE "emergency_contact" ALTER COLUMN "phone" TYPE character varying(11)`);
    }
}
