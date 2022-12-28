import {PatientVitalThresholds} from 'domain/entities';

export interface IPatientVitalThresholdsRepository {
    persist(patientVitalThresholds: PatientVitalThresholds): void;

    getOneByPatientUserId(patientUserId: string): Promise<PatientVitalThresholds>;
}

export const IPatientVitalThresholdsRepository = Symbol('IPatientVitalThresholdsRepository');
