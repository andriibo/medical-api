import {DoctorMetadata} from 'domain/entities/doctor-metadata.entity';
import {PatientMetadata} from 'domain/entities/patient-metadata.entity';

export enum UserRole {
    Caregiver = 'Caregiver',
    Doctor = 'Doctor',
    Patient = 'Patient',
}

export interface User {
    id: string;

    email: string | null;

    firstName: string;

    lastName: string;

    phone: string;

    role: string;

    createdAt: string;

    avatar: string | null;

    deletedAt: number | null;

    passwordUpdatedAt: number;

    doctorMetadata?: DoctorMetadata | null;

    patientMetadata?: PatientMetadata | null;
}
