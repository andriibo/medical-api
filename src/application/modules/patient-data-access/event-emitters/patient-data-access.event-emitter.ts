import {User} from 'domain/entities';

export interface IPatientDataAccessEventEmitter {
    emitPatientInitiatedAccessForUnregisteredDoctor(patient: User, doctorEmail: string): void;

    emitPatientInitiatedAccessForUnregisteredCaregiver(patient: User, caregiverEmail: string): void;

    emitGrantedUserInitiatedAccessToUnregisteredPatient(grantedUser: User, patientEmail: string): void;

    emitPatientInitiatedAccessForRegisteredDoctor(patient: User, doctorEmail: string): void;

    emitPatientInitiatedAccessForRegisteredCaregiver(patient: User, caregiverEmail: string): void;

    emitGrantedUserInitiatedAccessToRegisteredPatient(grantedUser: User, patientEmail: string): void;

    emitAccessDeletedByPatient(patient: User, grantedEmail: string): void;

    emitAccessWithdrawnByPatient(patient: User, grantedEmail: string): void;

    emitAccessDeletedByGrantedUser(grantedUser: User, patientEmail: string): void;

    emitAccessWithdrawnByGrantedUser(grantedUser: User, patientEmail: string): void;
}

export const IPatientDataAccessEventEmitter = Symbol('IPatientDataAccessEventEmitter');
