import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class alterPatientStatus1689158867021 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'patient_status',
            'status',
            new TableColumn({
                name: 'status',
                type: 'enum',
                enum: ['Abnormal', 'Borderline', 'Normal'],
                isNullable: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'patient_status',
            'status',
            new TableColumn({
                name: 'status',
                type: 'enum',
                enum: ['Abnormal', 'Normal'],
                isNullable: false,
            }),
        );
    }
}
