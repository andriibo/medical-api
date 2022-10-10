export enum AccessDirection {
    FromPatient = 'FromPatient',
    ToPatient = 'ToPatient',
}

export enum AccessStatus {
    Approved = 'Approved',
    Initiated = 'Initiated',
    Refused = 'Refused',
}

export interface PatientDataAccess {
    accessId: string;

    patientUserId: string;

    grantedUserId?: string;

    inviteId?: string;

    direction: string;

    status: string;

    createdAt: string;
}
