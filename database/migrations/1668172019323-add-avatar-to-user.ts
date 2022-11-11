import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class addAvatarToUser1668172019323 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'user',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                length: '255',
                isNullable: true,
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'avatar');
    }
}
