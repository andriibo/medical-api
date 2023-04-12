import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableColumn} from 'typeorm/schema-builder/table/TableColumn';

export class passwordUpdatedAt1681293691886 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('user', [
            new TableColumn({
                name: 'password_updated_at',
                type: 'int',
                isNullable: true,
            }),
        ]);

        await queryRunner.query(`UPDATE "user" SET password_updated_at = extract(epoch from created_at);`);
        await queryRunner.query(`ALTER TABLE "user" ALTER "password_updated_at" DROP DEFAULT;`);
        await queryRunner.query(`ALTER TABLE "user" ALTER "password_updated_at" SET NOT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'password_updated_at');
    }
}
