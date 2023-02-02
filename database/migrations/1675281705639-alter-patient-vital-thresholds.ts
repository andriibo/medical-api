import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class alterPatientVitalThresholds1675281705639 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'patient_vital_thresholds',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
                isNullable: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('patient_vital_thresholds', 'created_at');
    }
}
