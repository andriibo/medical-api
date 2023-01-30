export enum PatientCategoryEnum {
    Abnormal = 'Abnormal',
    Borderline = 'Borderline',
    Normal = 'Normal',
}

export interface PatientCategory {
    id: string;

    patientUserId: string;

    category: string;

    patientCategoryUpdatedAt: number | null;
}
