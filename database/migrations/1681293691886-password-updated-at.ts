import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableColumn} from 'typeorm/schema-builder/table/TableColumn';

export class passwordUpdatedAt1681293691886 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('user', [
            new TableColumn({
                name: 'password_updated_at',
                type: 'timestamp',
                default: 'now()',
                isNullable: false,
            }),
        ]);

        await queryRunner.query(`UPDATE "user" SET password_updated_at = created_at;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'password_updated_at');
    }
}
