export interface PatientMedication {
    id: string;

    patientUserId: string;

    genericName: string;

    brandNames: string[];

    createdBy: string;

    createdAt: string;
}
