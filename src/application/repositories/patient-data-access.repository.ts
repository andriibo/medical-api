import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {User} from 'domain/entities';

export interface IPatientDataAccessRepository {
    create(patientDataAccess: PatientDataAccess): Promise<void>;

    update(patientDataAccess: PatientDataAccess): Promise<void>;

    delete(patientDataAccess: PatientDataAccess): Promise<void>;

    getOneByPatientAndGrantedUser(patient: User, grantedUser: User): Promise<PatientDataAccess>;

    getOneByPatientAndGrantedUserId(patient: User, grantedUserId: string): Promise<PatientDataAccess>;

    getByPatient(patient: User): Promise<PatientDataAccess[]>;

    getByGrantedUser(grantedUser: User): Promise<PatientDataAccess[]>;

    getOneByAccessId(accessId: string): Promise<PatientDataAccess>;
}

export const IPatientDataAccessRepository = Symbol('IPatientDataAccessRepository');
