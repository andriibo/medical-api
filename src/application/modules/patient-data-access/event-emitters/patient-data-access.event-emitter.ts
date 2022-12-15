import {User} from 'domain/entities';

export interface IPatientDataAccessEventEmitter {
    emitPatientInitiatedAccessForUnregisteredGrantedUser(patient: User, grantedEmail: string): void;

    emitGrantedUserInitiatedAccessToUnregisteredPatient(grantedUser: User, patientEmail: string): void;

    emitPatientInitiatedAccessForRegisteredGrantedUser(patient: User, grantedEmail: string): void;

    emitGrantedUserInitiatedAccessToRegisteredPatient(grantedUser: User, patientEmail: string): void;

    emitAccessDeletedByPatient(patient: User, grantedEmail: string): void;

    emitAccessDeletedByGrantedUser(grantedUser: User, patientEmail: string): void;
}

export const IPatientDataAccessEventEmitter = Symbol('IPatientDataAccessEventEmitter');
