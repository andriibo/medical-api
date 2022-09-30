export enum UserRole {
    Doctor = 'Doctor',
    Patient = 'Patient',
}

export class User {
    userId: string;

    name: string;

    isActive: boolean;

    createdAt: string;
}
