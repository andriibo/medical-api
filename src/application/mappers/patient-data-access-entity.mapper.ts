import {User, PatientDataAccess} from 'domain/entities';

export interface IPatientDataAccessEntityMapper {
    mapByPatientAndGrantedUser(patient: User, grantedUser: User): PatientDataAccess;
}

export const IPatientDataAccessEntityMapper = Symbol('IPatientDataAccessEntityMapper');
