export enum VitalThresholdName {
    MinHR = 'MinHR',
    MaxHR = 'MaxHR',
    MinTemp = 'MinTemp',
    MinSpO2 = 'MinSpO2',
    MaxSpO2 = 'MaxSpO2',
    MinDBP = 'MinDBP',
    MaxDBP = 'MaxDBP',
    MinSBP = 'MinSBP',
    MaxSBP = 'MaxSBP',
    MinMAP = 'MinMAP',
    MaxMAP = 'MaxMAP',
}

export interface PatientVitalThreshold {
    id: string;

    patientUserId: string;

    thresholdName: string;

    value: number;

    setBy: string;

    setAt: string;
}
