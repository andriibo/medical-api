import {PatientDiagnosis} from 'domain/entities/patient-diagnosis.entity';

export interface IPatientDiagnosisRepository {
    create(patientDiagnosis: PatientDiagnosis): void;

    delete(patientDiagnosis: PatientDiagnosis): void;

    getByPatientUserId(patientUserId: string): Promise<PatientDiagnosis[]>;
}

export const IPatientDiagnosisRepository = Symbol('IPatientDiagnosisRepository');
