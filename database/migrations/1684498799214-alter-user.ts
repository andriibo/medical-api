import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableColumn} from 'typeorm/schema-builder/table/TableColumn';

export class alterUser1684498799214 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('user', [
            new TableColumn({
                name: 'role_label',
                type: 'enum',
                enum: ['CaregiverProfessional', 'Doctor', 'Family', 'Friend', 'Nurse', 'Patient'],
                isNullable: true,
            }),
        ]);

        await queryRunner.query(`UPDATE "user" SET "role_label" = 'CaregiverProfessional' WHERE "role" = 'Caregiver';`);
        await queryRunner.query(`UPDATE "user" SET "role_label" = 'Doctor' WHERE "role" = 'Doctor';`);
        await queryRunner.query(`UPDATE "user" SET "role_label" = 'Patient' WHERE "role" = 'Patient';`);

        await queryRunner.query(`ALTER TABLE "user" ALTER "role_label" DROP DEFAULT;`);
        await queryRunner.query(`ALTER TABLE "user" ALTER "role_label" SET NOT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'role_label');
    }
}
