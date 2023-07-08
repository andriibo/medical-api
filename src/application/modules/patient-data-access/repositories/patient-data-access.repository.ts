import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {PatientDataAccessStatusEnum} from 'domain/constants/patient-data-access.const';

export interface IPatientDataAccessRepository {
    create(patientDataAccess: PatientDataAccess): Promise<void>;

    update(patientDataAccess: PatientDataAccess | PatientDataAccess[]): Promise<void>;

    delete(patientDataAccess: PatientDataAccess): Promise<void>;

    getOneByPatientUserIdAndGrantedUserId(patientUserId: string, grantedUserId: string): Promise<PatientDataAccess>;

    getOneByPatientUserIdAndGrantedEmail(patientUserId: string, grantedEmail: string): Promise<PatientDataAccess>;

    getOneByGrantedUserIdAndPatientEmail(grantedUserId: string, patientEmail: string): Promise<PatientDataAccess>;

    getWithGrantedUserByPatientUserId(patientUserId: string): Promise<PatientDataAccess[]>;

    getWithPatientUserByGrantedUserId(grantedUserId: string): Promise<PatientDataAccess[]>;

    getByGrantedEmail(grantedEmail: string): Promise<PatientDataAccess[]>;

    getByPatientEmail(patientEmail: string): Promise<PatientDataAccess[]>;

    getOneById(id: string): Promise<PatientDataAccess>;

    getOneWithPatientUserById(id: string): Promise<PatientDataAccess>;

    getDoctorsByPatientUserIdAndStatus(
        patientUserId: string,
        status: PatientDataAccessStatusEnum,
    ): Promise<PatientDataAccess[]>;

    getCaregiversByPatientUserIdAndStatus(
        patientUserId: string,
        status: PatientDataAccessStatusEnum,
    ): Promise<PatientDataAccess[]>;

    getByGrantedUserIdAndStatus(
        grantedUserId: string,
        status: PatientDataAccessStatusEnum,
    ): Promise<PatientDataAccess[]>;

    getOneWithPatientAndMetadataByGrantedUserIdAndPatientUserId(
        grantedUserId: string,
        patientUserId: string,
    ): Promise<PatientDataAccess>;
}

export const IPatientDataAccessRepository = Symbol('IPatientDataAccessRepository');
