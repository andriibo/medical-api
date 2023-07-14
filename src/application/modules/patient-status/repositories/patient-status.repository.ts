import {PatientStatus} from 'domain/entities/patient-status.entity';

export interface IPatientStatusRepository {
    getByPatientUserId(patientUserId: string): Promise<PatientStatus>;
    getByPatientUserIds(patientUserIds: string[]): Promise<PatientStatus[]>;
    persist(entity: PatientStatus): Promise<PatientStatus>;
}

export const IPatientStatusRepository = Symbol('IPatientStatusRepository');
