import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class alterPatientStatus1689157792998 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'patient_status',
            new TableColumn({
                name: 'set_by',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.query(`UPDATE "patient_status" SET "set_by" = "patient_user_id";`);
        await queryRunner.query(`ALTER TABLE "patient_status" ALTER "set_by" DROP DEFAULT;`);
        await queryRunner.query(`ALTER TABLE "patient_status" ALTER "set_by" SET NOT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('patient_status', 'set_by');
    }
}
