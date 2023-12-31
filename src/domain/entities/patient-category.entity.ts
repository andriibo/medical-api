export enum PatientCategoryEnum {
    Abnormal = 'Abnormal',
    Borderline = 'Borderline',
    Normal = 'Normal',
}

export interface PatientCategory {
    id: string;

    patientUserId: string;

    grantedUserId: string;

    patientCategory: string;

    patientCategoryUpdatedAt: number | null;
}
