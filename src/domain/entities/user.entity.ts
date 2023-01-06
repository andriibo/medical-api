import {DoctorMetadata} from 'domain/entities/doctor-metadata.entity';
import {PatientMetadata} from 'domain/entities/patient-metadata.entity';

export enum UserRole {
    Caregiver = 'Caregiver',
    Doctor = 'Doctor',
    Patient = 'Patient',
}

export interface User {
    id: string;

    email: string;

    firstName: string;

    lastName: string;

    phone: string;

    role: string;

    createdAt: string;

    avatar: string | null;

    deletedAt: number | null;

    doctorMetadata?: DoctorMetadata | null;

    patientMetadata?: PatientMetadata | null;
}
