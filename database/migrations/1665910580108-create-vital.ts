import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';

export class createVital1665910580108 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
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
                        precision: 4,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: 'hr',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'spo',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'rr',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'fall',
                        type: 'boolean',
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

        await queryRunner.createIndex(
            'vital',
            new TableIndex({
                columnNames: ['timestamp', 'id'],
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vital');
    }
}
