import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableColumn} from 'typeorm/schema-builder/table/TableColumn';

export class alterUser1666710123456 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'is_active');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'user',
            new TableColumn({
                name: 'is_active',
                type: 'boolean',
                default: true,
                isNullable: false,
            }),
        );
    }
}
