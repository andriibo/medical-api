export enum ContactRelationship {
    MedicalProfessional = 'MedicalProfessional',
    Caregiver = 'Caregiver',
    Friends_Family = 'Friends&Family',
}

export interface EmergencyContact {
    id: string;

    userId: string;

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    relationship: string;

    createdAt: string;
}
