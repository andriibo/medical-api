import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class createPatientMetadata1664466428759 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'patient_metadata',
                columns: [
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'dob',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'gender',
                        type: 'enum',
                        enum: ['Male', 'Female', 'Other'],
                        isNullable: false,
                    },
                    {
                        name: 'height',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'wight',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'patient_metadata',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['user_id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patient_metadata');
    }
}
