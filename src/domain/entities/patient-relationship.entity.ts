import {User} from 'domain/entities/user.entity';

export interface PatientRelationship {
    id: string;

    patientUserId?: string;

    grantedUserId?: string;

    grantedEmail?: string;

    patientEmail?: string;

    direction: string;

    status: string;

    patientCategory: string;

    createdAt: string;

    patientCategoryUpdatedAt: number | null;

    grantedUser?: User | null;

    patientUser?: User | null;
}
