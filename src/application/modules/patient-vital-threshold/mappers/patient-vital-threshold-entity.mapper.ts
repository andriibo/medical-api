import {PatientVitalThreshold} from 'domain/entities';

export interface IPatientVitalThresholdEntityMapper {
    mapByValue(value: number, patientVitalThreshold: PatientVitalThreshold | null): PatientVitalThreshold;
}

export const IPatientVitalThresholdEntityMapper = Symbol('IPatientVitalThresholdEntityMapper');
