export interface PatientCategory {
    id: string;

    patientUserId: string;

    grantedUserId: string;

    patientCategory: string;

    patientCategoryUpdatedAt: number | null;
}
