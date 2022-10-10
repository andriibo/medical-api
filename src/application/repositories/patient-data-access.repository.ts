import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {User} from 'domain/entities';
import {PatientDataAccessModel} from 'presentation/models';

export interface IPatientDataAccessRepository {
    create(patientDataAccessModel: PatientDataAccessModel): Promise<void>;

    getByPatientAndGrantedUser(patient: User, grantedUser: User): Promise<PatientDataAccess>;
}

export const IPatientDataAccessRepository = Symbol('IPatientDataAccessRepository');
