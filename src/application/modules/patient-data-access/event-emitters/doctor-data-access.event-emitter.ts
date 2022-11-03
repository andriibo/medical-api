import {User} from 'domain/entities';

export interface IDoctorDataAccessEventEmitter {
    emitAccessForPatientDeleted(doctor: User, grantedEmail: string): void;
}

export const IDoctorDataAccessEventEmitter = Symbol('IDoctorDataAccessEventEmitter');
