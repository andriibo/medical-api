import {UserModel} from 'infrastructure/modules/auth/models';

export interface IRemoveUsersService {
    delete(user: UserModel): Promise<void>;
}

export const IRemoveUsersService = Symbol('IRemoveUsersService');
