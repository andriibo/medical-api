import {MigrationInterface, QueryRunner} from 'typeorm';

export class alterOrganizationSuggestedContacts1689595001450 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organization_suggested_contact" ALTER COLUMN "phone" TYPE character varying(15);`,
        );
        await queryRunner.query(
            `ALTER TABLE "organization_suggested_contact" ALTER COLUMN "fax" TYPE character varying(15);`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organization_suggested_contact" ALTER COLUMN "phone" TYPE character varying(11);`,
        );
        await queryRunner.query(
            `ALTER TABLE "organization_suggested_contact" ALTER COLUMN "fax" TYPE character varying(11);`,
        );
    }
}
