export interface PatientDataAccess {
    accessId: string;

    patientUserId: string;

    grantedUserId?: string;

    inviteId?: string;

    direction: string;

    status: string;

    createdAt: string;
}
