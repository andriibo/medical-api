import {VitalThresholdName} from 'domain/entities/patient-vital-threshold.entity';
import {ThresholdDto} from 'domain/dtos/response/patient-vital-threshold/threshold.dto';

const MinHR = {
    thresholdName: VitalThresholdName.MinHR,
    value: 40,
};

const MaxHR = {
    thresholdName: VitalThresholdName.MaxHR,
    value: 100,
};

const MinTemp = {
    thresholdName: VitalThresholdName.MinTemp,
    value: 36,
};

const MaxTemp = {
    thresholdName: VitalThresholdName.MaxTemp,
    value: 38,
};

const MinSpO2 = {
    thresholdName: VitalThresholdName.MinSpO2,
    value: 90,
};

const MinRR = {
    thresholdName: VitalThresholdName.MinRR,
    value: 12,
};

const MaxRR = {
    thresholdName: VitalThresholdName.MaxRR,
    value: 25,
};

const MinDBP = {
    thresholdName: VitalThresholdName.MinDBP,
    value: 60,
};

const MaxDBP = {
    thresholdName: VitalThresholdName.MaxDBP,
    value: 80,
};

const MinSBP = {
    thresholdName: VitalThresholdName.MinSBP,
    value: 100,
};

const MaxSBP = {
    thresholdName: VitalThresholdName.MaxSBP,
    value: 130,
};

const MinMAP = {
    thresholdName: VitalThresholdName.MinMAP,
    value: 65,
};

const MaxMAP = {
    thresholdName: VitalThresholdName.MaxMAP,
    value: 110,
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
