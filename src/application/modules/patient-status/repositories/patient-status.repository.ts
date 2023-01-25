import {PatientStatus} from 'domain/entities/patient-status.entity';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';

export interface IPatientStatusRepository {
    getByPatientUserId(patientUserId: string): Promise<PatientStatus>;
    persist(entity: PatientStatusModel): Promise<PatientStatus>;
}

export const IPatientStatusRepository = Symbol('IPatientStatusRepository');
