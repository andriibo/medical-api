import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {PatientDataAccess} from 'domain/entities';

export interface IMyPatientsService {
    getMyPatients(accesses: PatientDataAccess[]): Promise<MyPatientDto[]>;
}

export const IMyPatientsService = Symbol('IMyPatientsService');
