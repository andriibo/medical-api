import {MigrationInterface, QueryRunner} from 'typeorm';

export class alterPatientMetadata1666702958104 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('patient_metadata', 'wight', 'weight');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('patient_metadata', 'weight', 'wight');
    }
}
