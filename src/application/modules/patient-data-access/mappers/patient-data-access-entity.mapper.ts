import {User, PatientDataAccess} from 'domain/entities';

export interface IPatientDataAccessEntityMapper {
    mapByPatientAndGrantedUser(patient: User, grantedUser: User): PatientDataAccess;
    mapByPatientAndGrantedEmail(patient: User, email: string): PatientDataAccess;
    mapByGrantedUserAndPatientEmail(doctor: User, email: string): PatientDataAccess;
}

export const IPatientDataAccessEntityMapper = Symbol('IPatientDataAccessEntityMapper');
