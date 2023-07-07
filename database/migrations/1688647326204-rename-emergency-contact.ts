import {MigrationInterface, QueryRunner} from 'typeorm';

export class renameEmergencyContact1688647326204 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emergency_contact" RENAME TO "person_emergency_contact";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person_emergency_contact" RENAME TO "emergency_contact";`);
    }
}
