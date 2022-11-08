import {User} from 'domain/entities';

export interface IPatientDataAccessEventEmitter {
    emitPatientInitiatedAccessForUnregisteredDoctor(patient: User, grantedEmail: string): void;

    emitDoctorInitiatedAccessToUnregisteredPatient(doctor: User, grantedEmail: string): void;

    emitPatientInitiatedAccessForRegisteredDoctor(patient: User, grantedEmail: string): void;

    emitDoctorInitiatedAccessToRegisteredPatient(doctor: User, grantedEmail: string): void;

    emitAccessDeletedByPatient(patient: User, grantedEmail: string): void;

    emitAccessDeletedByDoctor(doctor: User, grantedEmail: string): void;
}

export const IPatientDataAccessEventEmitter = Symbol('IPatientDataAccessEventEmitter');
