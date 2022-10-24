import {User} from 'domain/entities';

export interface IAuthEventEmitter {
    emitDoctorCreated(doctor: User): void;
}

export const IAuthEventEmitter = Symbol('IAuthEventEmitter');
