import {User} from 'domain/entities';

export interface IDoctorDataAccessEventEmitter {
    emitAccessForUnregisteredUserInitiated(patient: User, grantedEmail: string): void;

    emitAccessForRegisteredUserInitiated(patient: User, grantedEmail: string): void;

    emitAccessForPatientDeleted(patient: User, grantedEmail: string): void;
}

export const IDoctorDataAccessEventEmitter = Symbol('IDoctorDataAccessEventEmitter');
