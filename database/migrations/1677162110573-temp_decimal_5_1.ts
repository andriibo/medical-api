import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableColumn} from 'typeorm/schema-builder/table/TableColumn';

export class tempDecimal511677162110573 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumns('vital', [
            {
                oldColumn: new TableColumn({
                    name: 'temp',
                    type: 'decimal',
                }),
                newColumn: new TableColumn({
                    name: 'temp',
                    type: 'decimal',
                    precision: 5,
                    scale: 1,
                    isNullable: true,
                }),
            },
        ]);
        await queryRunner.query(`ALTER TABLE "patient_vital_thresholds"
            ALTER "min_temp" TYPE numeric(5,1),
            ALTER "min_temp" SET DEFAULT '0',
            ALTER "min_temp" SET NOT NULL,
            ALTER "max_temp" TYPE numeric(5,1),
            ALTER "max_temp" SET DEFAULT '0',
            ALTER "max_temp" SET NOT NULL;
            COMMENT ON COLUMN "patient_vital_thresholds"."min_temp" IS '';
            COMMENT ON COLUMN "patient_vital_thresholds"."max_temp" IS '';
            COMMENT ON TABLE "patient_vital_thresholds" IS '';`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumns('vital', [
            {
                oldColumn: new TableColumn({
                    name: 'temp',
                    type: 'decimal',
                }),
                newColumn: new TableColumn({
                    name: 'temp',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    isNullable: true,
                }),
            },
        ]);
        await queryRunner.query(`ALTER TABLE "patient_vital_thresholds"
            ALTER "min_temp" TYPE real,
            ALTER "min_temp" SET DEFAULT '0',
            ALTER "min_temp" SET NOT NULL,
            ALTER "max_temp" TYPE real,
            ALTER "max_temp" SET DEFAULT '0',
            ALTER "max_temp" SET NOT NULL;
            COMMENT ON COLUMN "patient_vital_thresholds"."min_temp" IS '';
            COMMENT ON COLUMN "patient_vital_thresholds"."max_temp" IS '';
            COMMENT ON TABLE "patient_vital_thresholds" IS '';`);
    }
}
