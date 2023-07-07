import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class createOrganizationSuggestedContact1688719644710 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'organization_suggested_contact',
                columns: [
                    {
                        name: 'id',
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
                        name: 'name',
                        type: 'varchar',
                        length: '60',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: true,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: '11',
                        isNullable: false,
                    },
                    {
                        name: 'fax',
                        type: 'varchar',
                        length: '11',
                        isNullable: true,
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: ['Pharmacy', 'Nursing Home', 'Other'],
                        isNullable: false,
                    },
                    {
                        name: 'suggested_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                    },
                    {
                        name: 'suggested_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'organization_suggested_contact',
            new TableForeignKey({
                columnNames: ['patient_user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'organization_suggested_contact',
            new TableForeignKey({
                columnNames: ['suggested_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('organization_suggested_contact');
    }
}
