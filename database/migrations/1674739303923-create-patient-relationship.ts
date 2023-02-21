import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableColumn} from 'typeorm/schema-builder/table/TableColumn';

export class createPatientRelationship1674739303923 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('patient_data_access', [
            new TableColumn({
                name: 'patient_category',
                type: 'enum',
                enum: ['Abnormal', 'Borderline', 'Normal'],
                isNullable: false,
                default: "'Normal'",
            }),
            new TableColumn({
                name: 'patient_category_updated_at',
                type: 'int',
                isNullable: true,
            }),
        ]);
        await queryRunner.query(`ALTER TABLE "patient_data_access" RENAME TO "patient_relationship";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('patient_relationship', 'patient_data_access');
        await queryRunner.dropColumns('patient_data_access', ['patient_category', 'patient_category_updated_at']);
    }
}
