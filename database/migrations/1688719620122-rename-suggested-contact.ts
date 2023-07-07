import {MigrationInterface, QueryRunner} from 'typeorm';

export class renameSuggestedContact1688719620122 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suggested_contact" RENAME TO "person_suggested_contact";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person_suggested_contact" RENAME TO "suggested_contact";`);
    }
}
