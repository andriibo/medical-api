import {User} from 'domain/entities';

export interface IRemoveUserService {
    remove(user: User): Promise<void>;
}

export const IRemoveUserService = Symbol('IRemoveUserService');
