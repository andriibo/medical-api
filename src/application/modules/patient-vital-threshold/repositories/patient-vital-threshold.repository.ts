import {PatientVitalThreshold} from 'domain/entities';

export interface IPatientVitalThresholdRepository {
    persist(patientVitalThreshold: PatientVitalThreshold | PatientVitalThreshold[]): void;

    getByPatientUserId(patientUserId: string): Promise<PatientVitalThreshold[]>;
}

export const IPatientVitalThresholdRepository = Symbol('IPatientVitalThresholdRepository');
