import {DoctorMetadata, PatientMetadata, CaregiverMetadata} from 'domain/entities';

export interface User {
    id: string;

    email: string | null;

    firstName: string;

    lastName: string;

    phone: string;

    role: string;

    roleLabel: string;

    createdAt: string;

    avatar: string | null;

    deletedAt: number | null;

    passwordUpdatedAt: number;

    doctorMetadata?: DoctorMetadata | null;

    patientMetadata?: PatientMetadata | null;

    caregiverMetadata?: CaregiverMetadata | null;
}
