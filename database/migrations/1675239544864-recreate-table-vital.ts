import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';

export class recreateTableVital1675239544864 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vital');

        await queryRunner.createTable(
            new Table({
                name: 'vital',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'timestamp',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'temp',
                        type: 'decimal',
                        precision: 5,
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: 'is_temp_normal',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'hr',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'is_hr_normal',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'spo2',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'is_spo2_normal',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'rr',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'is_rr_normal',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'fall',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'thresholds_id',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
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

        await queryRunner.createForeignKey(
            'vital',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'vital',
            new TableForeignKey({
                columnNames: ['thresholds_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'patient_vital_thresholds',
                onDelete: 'RESTRICT',
            }),
        );

        await queryRunner.createIndex(
            'vital',
            new TableIndex({
                columnNames: ['timestamp', 'user_id'],
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vital');

        await queryRunner.createTable(
            new Table({
                name: 'vital',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                    },
                    {
                        name: 'timestamp',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'temperature',
                        type: 'decimal',
                        precision: 5,
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: 'hr',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'spo',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'rr',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'fall',
                        type: 'boolean',
                        isNullable: true,
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

        await queryRunner.createForeignKey(
            'vital',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createIndex(
            'vital',
            new TableIndex({
                columnNames: ['timestamp', 'id'],
                isUnique: true,
            }),
        );
    }
}
