import {PatientVitalThreshold} from 'domain/entities';
import {VitalThresholdName} from 'domain/entities/patient-vital-threshold.entity';

export interface IPatientVitalThresholdRepository {
    update(patientVitalThreshold: PatientVitalThreshold | PatientVitalThreshold[]): void;

    getByPatientUserIdAndThresholdNames(
        patientUserId: string,
        thresholdNames: VitalThresholdName[],
    ): Promise<PatientVitalThreshold[]>;
}

export const IPatientVitalThresholdRepository = Symbol('IPatientVitalThresholdRepository');
