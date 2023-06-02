import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableColumn} from 'typeorm/schema-builder/table/TableColumn';

export class alterEmergencyContact1684763792055 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('emergency_contact', [
            new TableColumn({
                name: 'rank',
                type: 'int',
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('emergency_contact', 'rank');
    }
}
