export enum PatientStatusEnum {
    Abnormal = 'Abnormal',
    Normal = 'Normal',
}

export interface PatientStatus {
    patientUserId: string;

    status: string;

    setAt: number;
}
