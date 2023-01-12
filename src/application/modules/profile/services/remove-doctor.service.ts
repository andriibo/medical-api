import {User} from 'domain/entities';

export interface IRemoveDoctorService {
    delete(doctor: User): Promise<void>;
}

export const IRemoveDoctorService = Symbol('IRemoveDoctorService');
