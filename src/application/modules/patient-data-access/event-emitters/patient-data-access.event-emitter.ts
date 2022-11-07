import {User} from 'domain/entities';

export interface IPatientDataAccessEventEmitter {
    emitAccessForUnregisteredUserInitiatedByPatient(patient: User, grantedEmail: string): void;

    emitAccessForUnregisteredUserInitiatedByDoctor(doctor: User, grantedEmail: string): void;

    emitAccessForRegisteredUserInitiatedByPatient(patient: User, grantedEmail: string): void;

    emitAccessForRegisteredUserInitiatedByDoctor(doctor: User, grantedEmail: string): void;

    emitAccessDeletedByPatient(patient: User, grantedEmail: string): void;

    emitAccessDeletedByDoctor(doctor: User, grantedEmail: string): void;
}

export const IPatientDataAccessEventEmitter = Symbol('IPatientDataAccessEventEmitter');
