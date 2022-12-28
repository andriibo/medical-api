import {PatientVitalThresholds, User} from 'domain/entities';
import {BloodPressureThresholdsDto} from 'domain/dtos/request/patient-vital-threshold/blood-pressure-thresholds.dto';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-threshold.dto';

export interface IPatientVitalThresholdsEntityMapper {
    mapByBloodPressureDto(
        dto: BloodPressureThresholdsDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds;

    mapByMinMaxHeartRateDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds;

    mapByMinMaxMeanArterialPressureDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds;

    mapByMinOxygenSaturationDto(
        dto: MinThresholdDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds;

    mapByMinMaxRespirationRateDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds;

    mapByMinMaxTemperatureDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds;
}

export const IPatientVitalThresholdsEntityMapper = Symbol('IPatientVitalThresholdsEntityMapper');
