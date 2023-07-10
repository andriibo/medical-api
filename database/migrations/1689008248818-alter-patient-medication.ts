import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class alterPatientMedication1689008248818 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'patient_medication',
            new TableColumn({
                name: 'times_per_day',
                type: 'enum',
                enum: ['QD', 'BID', 'TID', 'QID'],
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('patient_medication', 'times_per_day');
    }
}
