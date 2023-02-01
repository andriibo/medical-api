import {PatientDataAccess} from 'domain/entities';

export interface IDataAccessApprovedService {
    handle(dataAccess: PatientDataAccess): Promise<void>;
}

export const IDataAccessApprovedService = Symbol('IDataAccessApprovedService');
