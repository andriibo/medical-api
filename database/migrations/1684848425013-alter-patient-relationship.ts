import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableColumn} from 'typeorm/schema-builder/table/TableColumn';

export class alterPatientRelationship1684848425013 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('patient_relationship', [
            new TableColumn({
                name: 'last_invite_sent_at',
                type: 'int',
                isNullable: true,
            }),
        ]);

        await queryRunner.query(
            `UPDATE "patient_relationship" SET last_invite_sent_at = extract(epoch from created_at);`,
        );
        await queryRunner.query(`ALTER TABLE "patient_relationship" ALTER "last_invite_sent_at" DROP DEFAULT;`);
        await queryRunner.query(`ALTER TABLE "patient_relationship" ALTER "last_invite_sent_at" SET NOT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('patient_relationship', 'last_invite_sent_at');
    }
}
