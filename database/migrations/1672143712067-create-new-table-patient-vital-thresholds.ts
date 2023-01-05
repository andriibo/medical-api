import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';

export class createNewTablePatientVitalThresholds1672143712067 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('patient_vital_threshold', 'IDX_PATIENT_VITAL_THRESHOLD_NAME');
        await queryRunner.dropTable('patient_vital_threshold');

        await queryRunner.createTable(
            new Table({
                name: 'patient_vital_thresholds',
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
                        name: 'min_hr',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'max_hr',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'hr_set_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'hr_set_at',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'min_temp',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'max_temp',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'temp_set_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'temp_set_at',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'min_spo2',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'spo2_set_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'spo2_set_at',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'min_rr',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'max_rr',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'rr_set_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'rr_set_at',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'min_dbp',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'max_dbp',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'dbp_set_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'dbp_set_at',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'min_sbp',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'max_sbp',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'sbp_set_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'sbp_set_at',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'min_map',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'max_map',
                        type: 'real',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'map_set_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'map_set_at',
                        type: 'int',
                        isNullable: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKeys('patient_vital_thresholds', [
            new TableForeignKey({
                columnNames: ['patient_user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['hr_set_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['temp_set_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['spo2_set_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['rr_set_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['dbp_set_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['sbp_set_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['map_set_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'SET NULL',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patient_vital_thresholds');

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
}
