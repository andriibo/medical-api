import {MigrationInterface, QueryRunner} from 'typeorm';

const diagnoses = [
    "Alzheimer's Disease",
    'Amyotrophic Lateral Sclerosis (ALS)',
    'Arrhythmia of the Heart',
    'Arthritis',
    'Atrial Fibrillation',
    'Autism',
    'Bedsores (pressure ulcers)',
    'Bipolar Disorder (Manic-depressive illness)',
    'Cancer',
    'Cataracts',
    'Cholesterol',
    'Chronic Kidney Failure',
    'COPD, or Chronic Obstructive Pulmonary Disease',
    'Diabetes',
    'Fibromyalgia',
    'Glaucoma',
    'Heart Disease',
    'Hepatitis',
    'HIV/AIDS',
    'Hypertension (High Blood Pressure)',
    'Hyperthyroidism (overactive thyroid)',
    'Hypothyroidism (underactive thyroid)',
    'Irritable Bowel Syndrome (IBS)',
    'Incontinence, Urinary',
    'Inflammatory Bowel Disease (IBD)',
    'Kidney Failure, Chronic',
    'Leukemia',
    'Liver Failure, Acute',
    'Liver Spots (Age Spots)',
    'Lupus',
    "Lymphoma, Hodgkin's (Hodgkin's disease)",
    "Lymphoma, Non-Hodgkin's",
    'Macular Degeneration, Dry',
    'Melanoma, Skin Cancer',
    'Multiple Sclerosis (MS)',
    'Obstructive Sleep Apnea',
    'Osteoarthritis',
    'Osteoporosis',
    'Pancreatic Cancer',
    "Parkinson's Disease",
    'Periodontitis',
    'Pneumonia',
    'Post-traumatic stress disorder (PTSD)',
    'Rheumatoid Arthritis',
    'Staph Infections',
    'Stroke',
    'Thrush, Oral',
    'Transient Ischemic Attack (TIA)',
    'Tuberculosis (TB)',
    'Ulcerative Colitis',
    'Vascular Dementia',
    'Vertigo',
    'Wrinkles',
    'Prostrate condition',
    'Depression',
    'Cardio Vescular',
];

export class insertDiagnoses1666609552079 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const values = diagnoses.map((diagnosis) => `($$${diagnosis}$$)`);

        await queryRunner.query(`INSERT INTO diagnosis (diagnosis_name) VALUES ${values.join(',')}`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM diagnosis`);
    }
}
