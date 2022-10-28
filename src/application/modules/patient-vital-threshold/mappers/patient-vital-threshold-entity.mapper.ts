import {PatientVitalThreshold} from 'domain/entities';

export interface IPatientVitalThresholdMapper {
    mapByValue(value: number, patientVitalThreshold: PatientVitalThreshold | null): PatientVitalThreshold;
}

export const IPatientVitalThresholdMapper = Symbol('IPatientVitalThresholdMapper');
