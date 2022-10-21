export enum PatientDataAccessRequestDirection {
    FromPatient = 'FromPatient',
    ToPatient = 'ToPatient',
}

export enum PatientDataAccessStatus {
    Approved = 'Approved',
    Initiated = 'Initiated',
    Refused = 'Refused',
}

export interface PatientDataAccess {
    id: string;

    patientUserId: string;

    grantedUserId?: string;

    grantedUserEmail?: string;

    direction: string;

    status: string;

    createdAt: string;
}
