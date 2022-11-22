export enum SuggestedContactRelationship {
    MedicalProfessional = 'MedicalProfessional',
    Caregiver = 'Caregiver',
    Friends_Family = 'Friends&Family',
}

export interface SuggestedContact {
    id: string;

    patientUserId: string;

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    relationship: string;

    suggestedBy: string;

    suggestedAt: string;
}
