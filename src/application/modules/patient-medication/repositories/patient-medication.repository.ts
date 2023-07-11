import {PatientMedication} from 'domain/entities/patient-medication.entity';

export interface IPatientMedicationRepository {
    create(patientMedication: PatientMedication): void;

    update(patientMedication: PatientMedication): void;

    delete(patientMedication: PatientMedication): void;

    getByPatientUserId(patientMedication: string): Promise<PatientMedication[]>;

    getOneById(id: string): Promise<PatientMedication>;
}

export const IPatientMedicationRepository = Symbol('IPatientMedicationRepository');
