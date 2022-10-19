import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';

export class createPatientDataAccess1665065053449 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'patient_data_access',
                columns: [
                    {
                        name: 'access_id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: 'patient_user_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'granted_user_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'granted_user_email',
                        type: 'varchar',
                        length: '100',
                        isNullable: true,
                    },
                    {
                        name: 'direction',
                        type: 'enum',
                        enum: ['FromPatient', 'ToPatient'],
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['Initiated', 'Refused', 'Approved'],
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(
            'patient_data_access',
            new TableIndex({
                name: 'IDX_PATIENT_DATA_ACCESS_PATIENT',
                columnNames: ['patient_user_id', 'granted_user_id'],
                isUnique: true,
            }),
        );

        await queryRunner.createIndex(
            'patient_data_access',
            new TableIndex({
                name: 'IDX_GRANTED_USER_EMAIL',
                columnNames: ['granted_user_email'],
                isUnique: false,
            }),
        );

        await queryRunner.createForeignKey(
            'patient_data_access',
            new TableForeignKey({
                columnNames: ['patient_user_id'],
                referencedColumnNames: ['user_id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'patient_data_access',
            new TableForeignKey({
                columnNames: ['granted_user_id'],
                referencedColumnNames: ['user_id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('patient_data_access', 'IDX_PATIENT_DATA_ACCESS_PATIENT');
        await queryRunner.dropIndex('patient_data_access', 'IDX_GRANTED_USER_EMAIL');
        await queryRunner.dropTable('patient_data_access');
    }
}
