import {PatientDataAccess, PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {User} from 'domain/entities';

export interface IPatientDataAccessRepository {
    create(patientDataAccess: PatientDataAccess): Promise<void>;

    update(patientDataAccess: PatientDataAccess | PatientDataAccess[]): Promise<void>;

    delete(patientDataAccess: PatientDataAccess): Promise<void>;

    getOneByPatientUserIdAndGrantedUserId(patientUserId: string, grantedUserId: string): Promise<PatientDataAccess>;

    getOneByPatientUserIdAndGrantedEmail(patientUserId: string, grantedEmail: string): Promise<PatientDataAccess>;

    getOneByGrantedUserIdAndPatientEmail(grantedUserId: string, patientEmail: string): Promise<PatientDataAccess>;

    getByPatient(patient: User): Promise<PatientDataAccess[]>;

    getByGrantedUser(grantedUser: User): Promise<PatientDataAccess[]>;

    getByGrantedEmail(grantedEmail: string): Promise<PatientDataAccess[]>;

    getByPatientEmail(patientEmail: string): Promise<PatientDataAccess[]>;

    getOneById(id: string): Promise<PatientDataAccess>;

    getAccessesForDoctorsByPatientUserId(patientUserId: string): Promise<PatientDataAccess[]>;

    getAccessesForCaregiversByPatientUserId(patientUserId: string): Promise<PatientDataAccess[]>;

    getByGrantedUserIdAndStatus(grantedUserId: string, status: PatientDataAccessStatus): Promise<PatientDataAccess[]>;
}

export const IPatientDataAccessRepository = Symbol('IPatientDataAccessRepository');
