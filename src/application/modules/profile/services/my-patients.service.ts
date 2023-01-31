import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';

export interface IMyPatientsService {
    getMyPatients(grantedUserId: string): Promise<MyPatientDto[]>;
}

export const IMyPatientsService = Symbol('IMyPatientsService');
