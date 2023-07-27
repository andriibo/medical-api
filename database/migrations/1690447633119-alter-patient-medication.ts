import {MigrationInterface, QueryRunner} from 'typeorm';

export class alterPatientMedication1690447633119 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_medication" ALTER COLUMN "dose" TYPE numeric(8, 3);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_medication" ALTER COLUMN "dose" TYPE numeric(7, 2);`);
    }
}
