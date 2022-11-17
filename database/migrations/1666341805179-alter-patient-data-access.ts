import {MigrationInterface, QueryRunner, TableIndex} from 'typeorm';

export class alterPatientDataAccess1666341805179 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('patient_data_access', 'IDX_GRANTED_USER_EMAIL');

        await queryRunner.renameColumn('patient_data_access', 'granted_user_email', 'granted_email');

        await queryRunner.createIndex(
            'patient_data_access',
            new TableIndex({
                name: 'IDX_PATIENT_DATA_ACCESS_GRANTED_EMAIL',
                columnNames: ['granted_email', 'patient_user_id'],
                isUnique: true,
            }),
        );

        await queryRunner.createIndex(
            'patient_data_access',
            new TableIndex({
                name: 'IDX_PATIENT_DATA_ACCESS_PATIENT_EMAIL',
                columnNames: ['patient_email', 'granted_user_id'],
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('patient_data_access', 'IDX_PATIENT_DATA_ACCESS_GRANTED_EMAIL');

        await queryRunner.renameColumn('patient_data_access', 'granted_email', 'granted_user_email');

        await queryRunner.createIndex(
            'patient_data_access',
            new TableIndex({
                name: 'IDX_GRANTED_USER_EMAIL',
                columnNames: ['granted_user_email'],
                isUnique: false,
            }),
        );
    }
}
