import {UserMetadata} from './user-metadata.entity';

export enum UserRole {
    Caregiver = 'Caregiver',
    Doctor = 'Doctor',
    Patient = 'Patient',
}

export interface User {
    userId: string;

    email: string;

    firstName: string;

    lastName: string;

    phone: string;

    role: string;

    isActive: boolean;

    createdAt: string;

    metadata: UserMetadata;
}
