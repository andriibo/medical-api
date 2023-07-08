import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class alterDoctorMetadata1688817013566 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'doctor_metadata',
            new TableColumn({
                name: 'specialty',
                type: 'varchar',
                length: '100',
                default: "''",
                isNullable: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('doctor_metadata', 'specialty');
    }
}
