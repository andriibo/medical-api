import {PatientDiagnosis} from 'domain/entities/patient-diagnosis.entity';

export interface IPatientDiagnosisRepository {
    create(patientDiagnosis: PatientDiagnosis): void;

    update(patientDiagnosis: PatientDiagnosis): void;

    delete(patientDiagnosis: PatientDiagnosis): void;

    getByPatientUserId(patientUserId: string): Promise<PatientDiagnosis[]>;

    getOneById(id: string): Promise<PatientDiagnosis>;
}

export const IPatientDiagnosisRepository = Symbol('IPatientDiagnosisRepository');
