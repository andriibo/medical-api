import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createSpecialty1688814480175 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'specialty',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: 'specialty_name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('specialty');
    }
}
