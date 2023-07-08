import {User} from 'domain/entities/user.entity';

export interface PatientDataAccess {
    id: string;

    patientUserId?: string;

    grantedUserId?: string;

    grantedEmail?: string;

    patientEmail?: string;

    direction: string;

    status: string;

    createdAt: string;

    lastInviteSentAt: number;

    grantedUser?: User | null;

    patientUser?: User | null;
}
