export enum UserRole {
    Doctor = 'Doctor',
    Patient = 'Patient',
}

export class User {
    userId: string;

    email: string;

    firstName: string;

    lastName: string;

    phone: string;

    role: string;

    isActive: boolean;

    createdAt: string;
}
