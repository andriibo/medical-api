import {User} from 'domain/entities';

export interface IAuthedUserService {
    getUser(): Promise<User>;
}

export const IAuthedUserService = Symbol('IAuthedUserService');
