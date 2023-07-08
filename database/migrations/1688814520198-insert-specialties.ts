import {MigrationInterface, QueryRunner} from 'typeorm';

const specialties = [
    'Addiction Medicine',
    'Allergy and Immunology',
    'Anesthesiology',
    'Colon and Rectal Surgery',
    'Cosmetic Dermatologic Surgery',
    'Dermatology',
    'Diagnostic Radiology',
    'Emergency Medicine',
    'Facial Plastic Surgery',
    'Family Medicine/Family Practice',
    'General Surgery',
    'Hospice and Palliative Medicine',
    'Integrated Plastic Surgery',
    'Integrated Thoracic Surgery',
    'Integrated Vascular Surgery',
    'Internal Medicine',
    'Internal Medicine-Emergency Medicine',
    'Internal Medicine-Pediatrics',
    'Internal Medicine-Psychiatry',
    'Medical Genetics and Genomics',
    'Medical Physics',
    'Microsurgery',
    'Movement Disorders',
    'Musculoskeletal Oncology',
    'Neurological Surgery',
    'Neurology',
    'Nuclear Medicine',
    'Obstetrics and Gynecology',
    'Ophthalmology',
    'Orthopaedic Surgery',
    'Osteopathic Neuromusculoskeletal Medicine',
    'Otolaryngology-Head and Neck Surgery',
    'Pathology',
    'Pediatrics',
    'Physical Medicine and Rehabilitation',
    'Plastic Surgery',
    'Preventive Medicine',
    'Psychiatry',
    'Psychiatry-Family Medicine',
    'Sleep Medicine',
    'Thoracic Surgery/Thoracic and Cardiac Surgery',
    'Urology',
];

export class insertSpecialties1688814520198 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const values = specialties.map((specialty) => `($$${specialty}$$)`);

        await queryRunner.query(`INSERT INTO specialty (specialty_name) VALUES ${values.join(',')}`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM specialty`);
    }
}
