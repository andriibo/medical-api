import {User} from 'domain/entities';

export interface IPatientDataAccessEventEmitter {
    emitAccessForUnregisteredUserInitiated(patient: User, grantedEmail: string): void;

    emitAccessForRegisteredUserInitiated(patient: User, grantedEmail: string): void;

    emitAccessDeletedByPatient(patient: User, grantedEmail: string): void;

    emitAccessDeletedByDoctor(doctor: User, grantedEmail: string): void;
}

export const IPatientDataAccessEventEmitter = Symbol('IPatientDataAccessEventEmitter');
