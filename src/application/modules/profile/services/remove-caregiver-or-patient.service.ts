import {User} from 'domain/entities';

export interface IRemoveCaregiverOrPatientService {
    delete(user: User): Promise<void>;
}

export const IRemoveCaregiverOrPatientService = Symbol('IRemoveCaregiverOrPatientService');
