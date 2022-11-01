import {User} from 'domain/entities';

export interface IPatientDataAccessEventEmitter {
    emitAccessForUnregisteredUserInitiated(patient: User, email: string): void;

    emitAccessForRegisteredUserInitiated(patient: User, email: string): void;
}

export const IPatientDataAccessEventEmitter = Symbol('IPatientDataAccessEventEmitter');
