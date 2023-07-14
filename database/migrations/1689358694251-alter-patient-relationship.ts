import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableColumn} from 'typeorm/schema-builder/table/TableColumn';

export class alterPatientRelationship1689358694251 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('patient_relationship', ['patient_category', 'patient_category_updated_at']);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('patient_relationship', [
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
    }
}
