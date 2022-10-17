import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class createEmergencyContact1665694553884 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'emergency_contact',
                columns: [
                    {
                        name: 'contact_id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isGenerated: false,
                        isPrimary: false,
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        length: '30',
                        isNullable: false,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        length: '30',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: '11',
                        isNullable: false,
                    },
                    {
                        name: 'relationship',
                        type: 'enum',
                        enum: ['MedicalProfessional', 'Caregiver', 'Friends&Family'],
                        isNullable: false,
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
            'emergency_contact',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['user_id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('emergency_contact');
    }
}
