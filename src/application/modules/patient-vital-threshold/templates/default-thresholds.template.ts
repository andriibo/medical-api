import {VitalThresholdName} from 'domain/entities/patient-vital-threshold.entity';
import {ThresholdDto} from 'domain/dtos/response/patient-vital-threshold/threshold.dto';

export const MinHR = {
    thresholdName: VitalThresholdName.MinHR,
    value: 40,
};

export const MaxHR = {
    thresholdName: VitalThresholdName.MaxHR,
    value: 220,
};

export const MinTemp = {
    thresholdName: VitalThresholdName.MinTemp,
    value: 32,
};

export const MaxTemp = {
    thresholdName: VitalThresholdName.MaxTemp,
    value: 42,
};

export const MinSpO2 = {
    thresholdName: VitalThresholdName.MinSpO2,
    value: 40,
};

export const MinRR = {
    thresholdName: VitalThresholdName.MinRR,
    value: 4,
};

export const MaxRR = {
    thresholdName: VitalThresholdName.MaxRR,
    value: 60,
};

export const MinDBP = {
    thresholdName: VitalThresholdName.MinDBP,
    value: 30,
};

export const MaxDBP = {
    thresholdName: VitalThresholdName.MaxDBP,
    value: 130,
};

export const MinSBP = {
    thresholdName: VitalThresholdName.MinSBP,
    value: 70,
};

export const MaxSBP = {
    thresholdName: VitalThresholdName.MaxSBP,
    value: 220,
};

export const MinMAP = {
    thresholdName: VitalThresholdName.MinMAP,
    value: 43, // Calculated by the formula: MinMAP ~ 1/3(MinSBP + 2MinDBP)
};

export const MaxMAP = {
    thresholdName: VitalThresholdName.MaxMAP,
    value: 160, // Calculated by the formula: MaxMAP ~ 1/3(MaxSBP + 2MaxDBP)
};

export const DefaultThresholdsTemplate = [
    MinHR,
    MaxHR,
    MinTemp,
    MaxTemp,
    MinSpO2,
    MinRR,
    MaxRR,
    MinDBP,
    MaxDBP,
    MinSBP,
    MaxSBP,
    MinMAP,
    MaxMAP,
] as ThresholdDto[];
