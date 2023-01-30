import {MigrationInterface, QueryRunner} from 'typeorm';

export class insertAbsentPatientVitalThresholds1675111171768 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const records = await queryRunner.query(`
SELECT u.id
FROM "user" u
LEFT JOIN "patient_vital_thresholds" pvt ON u.id = pvt.patient_user_id
WHERE u.role = 'Patient' AND pvt.patient_user_id IS NULL;
`);

        const defaultValues = {
            min_hr: 40,
            max_hr: 220,
            min_temp: 32,
            max_temp: 42,
            min_spo2: 40,
            min_rr: 4,
            max_rr: 60,
            min_dbp: 30,
            max_dbp: 130,
            min_sbp: 70,
            max_sbp: 220,
            min_map: 43,
            max_map: 160,
        };

        const values = records.map((record) => {
            return `('${record.id}', ${Object.values(defaultValues).join(', ')})`;
        });

        await queryRunner.query(`
INSERT INTO patient_vital_thresholds (patient_user_id, ${Object.keys(defaultValues).join(', ')}) VALUES ${values.join(',')}
`);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async down(queryRunner: QueryRunner): Promise<void> {}
}
