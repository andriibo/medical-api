export enum VitalThresholdName {
    MinHR = 'MinHR',
    MaxHR = 'MaxHR',
    MinTemp = 'MinTemp',
    MaxTemp = 'MaxTemp',
    MinSpO2 = 'MinSpO2',
    MinDBP = 'MinDBP',
    MaxDBP = 'MaxDBP',
    MinSBP = 'MinSBP',
    MaxSBP = 'MaxSBP',
    MinMAP = 'MinMAP',
    MaxMAP = 'MaxMAP',
}

export interface PatientVitalThreshold {
    id: number;

    patientUserId: string;

    thresholdName: string;

    value: number;

    setBy: string;

    setAt: number;
}
