import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class createPatientStatus1674490117906 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'patient_status',
                columns: [
                    {
                        name: 'patient_user_id',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: true,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['Abnormal', 'Normal'],
                        isNullable: false,
                    },
                    {
                        name: 'set_at',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'patient_status',
            new TableForeignKey({
                columnNames: ['patient_user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patient_status');
    }
}
