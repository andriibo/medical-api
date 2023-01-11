import {User} from 'domain/entities';

export interface IRemoveUsersService {
    delete(user: User): Promise<void>;
}

export const IRemoveUsersService = Symbol('IRemoveUsersService');
