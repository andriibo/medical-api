import {User} from 'domain/entities';

export interface IRemoveUserService {
    delete(doctor: User): Promise<void>;
}

export const IRemoveUserService = Symbol('IRemoveUserService');
