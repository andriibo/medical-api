import {PatientDataAccess, User} from 'domain/entities';

export interface IPatientDataAccessEventEmitter {
    emitPatientInitiatedAccessForUnregisteredDoctor(patient: User, doctorEmail: string): void;

    emitPatientInitiatedAccessForUnregisteredCaregiver(patient: User, caregiverEmail: string): void;

    emitGrantedUserInitiatedAccessToUnregisteredPatient(grantedUser: User, patientEmail: string): void;

    emitPatientInitiatedAccessForRegisteredDoctor(patient: User, doctorEmail: string): void;

    emitPatientInitiatedAccessForRegisteredCaregiver(patient: User, caregiverEmail: string): void;

    emitGrantedUserInitiatedAccessToRegisteredPatient(grantedUser: User, patientEmail: string): void;

    emitGrantedUserResentRequestToPatient(grantedUser: User, dataAccess: PatientDataAccess): void;

    emitAccessDeletedByPatient(patient: User, grantedUser: User): void;

    emitAccessWithdrawnByPatient(patient: User, grantedEmail: string): void;

    emitAccessDeletedByGrantedUser(grantedUser: User, patientEmail: string): void;

    emitAccessWithdrawnByGrantedUser(grantedUser: User, patientEmail: string): void;

    emitDataAccessApproved(dataAccess: PatientDataAccess): void;
}

export const IPatientDataAccessEventEmitter = Symbol('IPatientDataAccessEventEmitter');
