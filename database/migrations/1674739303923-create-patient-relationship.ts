import {MigrationInterface, QueryRunner} from 'typeorm';

export class createPatientRelationship1674739303923 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('patient_data_access', 'patient_relationship');
        await queryRunner.query(
            `CREATE TYPE patient_relationship_patient_category_enum AS ENUM ('Abnormal', 'Borderline', 'Normal')`,
        );
        await queryRunner.query(
            `ALTER TABLE "patient_relationship" ADD COLUMN "patient_category" patient_relationship_patient_category_enum`,
        );
        await queryRunner.query(
            `UPDATE "patient_relationship" SET "patient_category" = 'Normal' WHERE "patient_category" IS NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "patient_relationship" ALTER COLUMN "patient_category" SET DEFAULT 'Normal'`,
        );
        await queryRunner.query(`ALTER TABLE "patient_relationship" ADD COLUMN "patient_category_updated_at" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('patient_relationship', 'patient_data_access');
        await queryRunner.dropColumns('patient_data_access', ['patient_category', 'patient_category_updated_at']);
    }
}
