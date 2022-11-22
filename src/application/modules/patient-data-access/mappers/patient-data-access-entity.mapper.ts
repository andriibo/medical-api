import {User, PatientDataAccess} from 'domain/entities';

export interface IPatientDataAccessEntityMapper {
    mapByPatientAndGrantedUser(patient: User, grantedUser: User): PatientDataAccess;
    mapByPatientAndGrantedEmail(patient: User, grantedEmail: string): PatientDataAccess;
    mapByGrantedUserAndPatientEmail(doctor: User, patientEmail: string): PatientDataAccess;
}

export const IPatientDataAccessEntityMapper = Symbol('IPatientDataAccessEntityMapper');
