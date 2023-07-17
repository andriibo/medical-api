import {MigrationInterface, QueryRunner} from 'typeorm';

export class alterOrganizationEmergencyContacts1689594991375 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organization_emergency_contact" ALTER COLUMN "phone" TYPE character varying(15);`,
        );
        await queryRunner.query(
            `ALTER TABLE "organization_emergency_contact" ALTER COLUMN "fax" TYPE character varying(15);`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organization_emergency_contact" ALTER COLUMN "phone" TYPE character varying(11);`,
        );
        await queryRunner.query(
            `ALTER TABLE "organization_emergency_contact" ALTER COLUMN "fax" TYPE character varying(11);`,
        );
    }
}
