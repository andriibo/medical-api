import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class createPatientDiagnosis1666633603938 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'patient_diagnosis',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: 'patient_user_id',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                    },
                    {
                        name: 'diagnosis_name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'created_by',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'patient_diagnosis',
            new TableForeignKey({
                columnNames: ['patient_user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'patient_diagnosis',
            new TableForeignKey({
                columnNames: ['created_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patient_diagnosis');
    }
}
