import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {User} from 'domain/entities';
import {PatientDataAccessModel} from 'presentation/models';

export interface IPatientDataAccessRepository {
    create(patientDataAccessModel: PatientDataAccessModel): Promise<void>;

    getOneByPatientAndGrantedUser(patient: User, grantedUser: User): Promise<PatientDataAccess>;

    getByPatient(patient: User): Promise<PatientDataAccess[]>;

    getByGrantedUser(grantedUser: User): Promise<PatientDataAccess[]>;
}

export const IPatientDataAccessRepository = Symbol('IPatientDataAccessRepository');
