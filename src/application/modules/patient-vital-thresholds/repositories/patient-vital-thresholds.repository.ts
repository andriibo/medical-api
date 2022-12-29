import {PatientVitalThresholds} from 'domain/entities';

export interface IPatientVitalThresholdsRepository {
    insert(patientVitalThresholds: PatientVitalThresholds): void;

    getCurrentThresholdsByPatientUserId(patientUserId: string): Promise<PatientVitalThresholds>;
}

export const IPatientVitalThresholdsRepository = Symbol('IPatientVitalThresholdsRepository');
