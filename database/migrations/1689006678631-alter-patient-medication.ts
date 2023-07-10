import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class alterPatientMedication1689006678631 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'patient_medication',
            new TableColumn({
                name: 'dose',
                type: 'decimal',
                precision: 7,
                scale: 2,
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('patient_medication', 'dose');
    }
}
