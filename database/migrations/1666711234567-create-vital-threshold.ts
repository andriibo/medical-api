import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';

export class createVitalThreshold1666711234567 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vital_threshold',
                columns: [
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: true,
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
                        type: 'smalldecimal',
                        isNullable: false,
                    },
                    {
                        name: 'set_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'vital_threshold',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'vital_threshold',
            new TableForeignKey({
                columnNames: ['set_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createIndex(
            'vital_threshold',
            new TableIndex({
                name: 'IDX_VITAL_THRESHOLD_NAME',
                columnNames: ['user_id', 'threshold_name'],
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('vital_threshold', 'IDX_VITAL_THRESHOLD_NAME');
        await queryRunner.dropTable('vital_threshold');
    }
}
