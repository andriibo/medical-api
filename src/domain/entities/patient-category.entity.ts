import {User} from 'domain/entities/user.entity';

export interface PatientCategory {
    id: string;

    patientUserId?: string;

    grantedUserId?: string;

    category: string;

    patientCategoryUpdatedAt: number;

    grantedUser?: User | null;

    patientUser?: User | null;
}
