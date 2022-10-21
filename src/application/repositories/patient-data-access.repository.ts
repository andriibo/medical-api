import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {User} from 'domain/entities';

export interface IPatientDataAccessRepository {
    create(patientDataAccess: PatientDataAccess): Promise<void>;

    update(patientDataAccess: PatientDataAccess): Promise<void>;

    delete(patientDataAccess: PatientDataAccess): Promise<void>;

    getOneByPatientUserIdAndGrantedUserId(patientUserId: string, grantedUserId: string): Promise<PatientDataAccess>;

    getOneByPatientUserIdAndGrantedEmail(patientUserId: string, grantedEmail: string): Promise<PatientDataAccess>;

    getByPatient(patient: User): Promise<PatientDataAccess[]>;

    getByGrantedUser(grantedUser: User): Promise<PatientDataAccess[]>;

    getOneById(id: string): Promise<PatientDataAccess>;
}

export const IPatientDataAccessRepository = Symbol('IPatientDataAccessRepository');
