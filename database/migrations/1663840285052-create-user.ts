import {MigrationInterface, Table, TableIndex, QueryRunner} from 'typeorm';

export class createUser1663840285052 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'user_id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        length: '30',
                        isNullable: false,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        length: '30',
                        isNullable: false,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: '11',
                        isNullable: false,
                    },
                    {
                        name: 'role',
                        type: 'enum',
                        enum: ['Caregiver', 'Doctor', 'Patient'],
                        isNullable: false,
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        default: true,
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
            'user',
            new TableIndex({
                name: 'IDX_USER_EMAIL',
                columnNames: ['email'],
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('user', 'IDX_USER_EMAIL');
        await queryRunner.dropTable('user');
    }
}
