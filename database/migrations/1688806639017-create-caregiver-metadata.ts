import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class createCaregiverMetadata1688806639017 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'caregiver_metadata',
                columns: [
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: true,
                    },
                    {
                        name: 'institution',
                        type: 'varchar',
                        length: '100',
                        default: "''",
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'caregiver_metadata',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('caregiver_metadata');
    }
}
