import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';

export class createPatientVitalThreshold1666711234567 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'patient_vital_threshold',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: 'patient_user_id',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                    },
                    {
                        name: 'threshold_name',
                        type: 'enum',
                        enum: [
                            'MinHR',
                            'MaxHR',
                            'MinTemp',
                            'MaxTemp',
                            'MinSpO2',
                            'MinRR',
                            'MaxRR',
                            'MinDBP',
                            'MaxDBP',
                            'MinSBP',
                            'MaxSBP',
                            'MinMAP',
                            'MaxMAP',
                        ],
                        isNullable: false,
                    },
                    {
                        name: 'value',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'set_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                    },
                    {
                        name: 'set_at',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'patient_vital_threshold',
            new TableForeignKey({
                columnNames: ['patient_user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'patient_vital_threshold',
            new TableForeignKey({
                columnNames: ['set_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createIndex(
            'patient_vital_threshold',
            new TableIndex({
                name: 'IDX_PATIENT_VITAL_THRESHOLD_NAME',
                columnNames: ['patient_user_id', 'threshold_name'],
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('patient_vital_threshold', 'IDX_VITAL_THRESHOLD_NAME');
        await queryRunner.dropTable('patient_vital_threshold');
    }
}
