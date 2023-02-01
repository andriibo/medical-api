import {PatientVitalThresholds, User} from 'domain/entities';
import {BloodPressureThresholdsDto} from 'domain/dtos/request/patient-vital-thresholds/blood-pressure-thresholds.dto';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-max-threshold.dto';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-threshold.dto';

export interface IPatientVitalThresholdsEntityMapper {
    mapByBloodPressureDto(
        dto: BloodPressureThresholdsDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds;

    mapByMinMaxHeartRateDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds;

    mapByMinMaxMeanArterialPressureDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds;

    mapByMinOxygenSaturationDto(
        dto: MinThresholdDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds;

    mapByMinMaxRespirationRateDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds;

    mapByMinMaxTemperatureDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds;

    mapDefaultByPatient(patient: User): PatientVitalThresholds;
}

export const IPatientVitalThresholdsEntityMapper = Symbol('IPatientVitalThresholdsEntityMapper');
