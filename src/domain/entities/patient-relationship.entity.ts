import {User} from 'domain/entities/user.entity';

export enum PatientRelationshipStatus {
    Approved = 'Approved',
    Initiated = 'Initiated',
    Refused = 'Refused',
}

export interface PatientRelationship {
    id: string;

    patientUserId: string | null;

    grantedUserId: string | null;

    grantedEmail: string | null;

    patientEmail: string | null;

    direction: string;

    status: string;

    patientCategory: string;

    createdAt: string;

    patientCategoryUpdatedAt: number | null;

    patientUser?: User | null;
}
